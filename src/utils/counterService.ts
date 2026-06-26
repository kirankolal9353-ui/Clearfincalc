import { initializeApp, getApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, doc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let isInitialized = false;

const CACHE_KEY = 'clearfincalc_total_calculations';

// Try to initialize Firebase
export async function initializeCounterDb(): Promise<Firestore | null> {
  if (isInitialized) return db;

  try {
    // 1. Check if we already have initialized apps
    if (getApps().length > 0) {
      app = getApp();
      db = getFirestore(app);
      isInitialized = true;
      return db;
    }

    // 2. Try fetching the dynamic config from hosting
    let config: any = null;
    try {
      const response = await fetch('/__/firebase/init.json');
      if (response.ok) {
        config = await response.json();
      }
    } catch (e) {
      // Ignored: expected to fail when running locally without firebase hosting emulator
    }

    // 3. Fallback to env variable if present
    if (!config && import.meta.env.VITE_FIREBASE_CONFIG) {
      try {
        config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
      } catch (e) {
        console.error('Failed to parse VITE_FIREBASE_CONFIG env variable');
      }
    }

    // 4. Initialize if config found
    if (config) {
      app = initializeApp(config);
      db = getFirestore(app);
      isInitialized = true;
      return db;
    }
  } catch (error) {
    console.error('Failed to initialize Firebase counter service:', error);
  }

  isInitialized = true; // Set to true so we don't spam requests
  return null;
}

export function getCachedCount(): number | null {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const num = parseInt(cached, 10);
    if (!isNaN(num)) return num;
  }
  return null;
}

export function setCachedCount(count: number): void {
  localStorage.setItem(CACHE_KEY, count.toString());
}

export async function incrementCalculationCount(): Promise<void> {
  const database = await initializeCounterDb();
  if (!database) {
    // Local development / fallback mock increment
    const current = getCachedCount() || 1420945;
    const next = current + 1;
    setCachedCount(next);
    // Dispatch local storage update event so dynamic elements update in the same window
    window.dispatchEvent(new Event('storage'));
    return;
  }

  try {
    const docRef = doc(database, 'stats', 'calculations');
    await setDoc(docRef, {
      count: increment(1)
    }, { merge: true });
  } catch (error) {
    console.error('Failed to increment calculation count in Firestore:', error);
    // Fallback to local mock increment on network error
    const current = getCachedCount() || 1420945;
    setCachedCount(current + 1);
  }
}

export function subscribeToCalculationCount(
  onUpdate: (count: number | null) => void
): () => void {
  let unsubscribe: (() => void) | null = null;
  let active = true;

  const startSubscription = async () => {
    const database = await initializeCounterDb();
    if (!database || !active) {
      // Local dev mode fallback or component already unmounted
      onUpdate(getCachedCount());
      
      // Listen for local changes
      const handleStorageChange = () => {
        if (active) onUpdate(getCachedCount());
      };
      window.addEventListener('storage', handleStorageChange);
      unsubscribe = () => {
        window.removeEventListener('storage', handleStorageChange);
      };
      return;
    }

    try {
      const docRef = doc(database, 'stats', 'calculations');
      unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const count = data?.count;
            if (typeof count === 'number') {
              setCachedCount(count);
              onUpdate(count);
              return;
            }
          }
          // Handle document doesn't exist or empty count field
          onUpdate(getCachedCount());
        },
        (error) => {
          console.error('Firestore snapshot listener error:', error);
          onUpdate(getCachedCount());
        }
      );
    } catch (e) {
      console.error('Error setting up Firestore subscription:', e);
      onUpdate(getCachedCount());
    }
  };

  startSubscription();

  return () => {
    active = false;
    if (unsubscribe) {
      unsubscribe();
    }
  };
}

export function formatIndianNumber(value: number | null): string {
  if (value === null) return 'Calculations unavailable';
  return new Intl.NumberFormat('en-IN').format(value);
}
