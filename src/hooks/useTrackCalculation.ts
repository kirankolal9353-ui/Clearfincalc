import { useEffect, useRef } from 'react';
import { incrementCalculationCount } from '../utils/counterService';

export function useTrackCalculation(calculatorId: string, inputs: Record<string, any>) {
  const isFirstMount = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevInputsRef = useRef<string>('');

  const inputsJson = JSON.stringify(inputs);

  useEffect(() => {
    // Skip tracking on initial mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevInputsRef.current = inputsJson;
      return;
    }

    // Skip if inputs haven't actually changed (e.g. parent renders with same inputs)
    if (prevInputsRef.current === inputsJson) {
      return;
    }

    prevInputsRef.current = inputsJson;

    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce the tracking call by 1000ms
    debounceTimer.current = setTimeout(async () => {
      // Validate inputs: make sure they are valid values
      const hasValidInputs = Object.values(inputs).every((val) => {
        if (val === null || val === undefined || val === '') return false;
        if (typeof val === 'number' && isNaN(val)) return false;
        return true;
      });

      if (hasValidInputs) {
        await incrementCalculationCount();
      }
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputsJson, calculatorId]);
}
