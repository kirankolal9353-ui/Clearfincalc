
import type { FirebaseApp } from 'firebase/app';

import type { Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let isInitialized = false;

const CACHE_KEY = 'clearfincalc_total_calculations';

// Try to initialize Firebase
export async function initializeCounterDb(): Promise<Firestore | null> {
  if (isInitialized) return db;

  try {
    // 2. Try fetching the dynamic config from hosting
    let config: Record<string, unknown> | null = null;
    try {
      const response = await fetch('/__/firebase/init.json');
      if (response.ok) {
        config = (await response.json()) as Record<string, unknown>;
      }
    } catch {
      // Ignored: expected to fail when running locally without firebase hosting emulator
    }

    // 3. Fallback to env variable if present
    if (!config && import.meta.env.VITE_FIREBASE_CONFIG) {
      try {
        config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
      } catch {
        // Fallback gracefully if env var is unparseable
      }
    }

    // 4. Initialize if config found
    if (config) {
      const { initializeApp, getApp, getApps } = await import('firebase/app');
      const { getFirestore } = await import('firebase/firestore');
      app = getApps().length ? getApp() : initializeApp(config);
      db = getFirestore(app);
      isInitialized = true;
      return db;
    }
  } catch {
    // Expected fallback when Firebase is not configured or network is unreachable
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
  if (!database) return;

  try {
    const { doc, setDoc, increment } = await import('firebase/firestore');
    const docRef = doc(database, 'stats', 'calculations');
    await setDoc(docRef, {
      count: increment(1)
    }, { merge: true });
  } catch {
    // Fallback to local mock increment on network error
    return;
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
      const { doc, onSnapshot } = await import('firebase/firestore');
      if (!active) return;
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
        () => {
          // Fallback gracefully on snapshot listener error
          onUpdate(getCachedCount());
        }
      );
    } catch {
      // Fallback gracefully on subscription error
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
