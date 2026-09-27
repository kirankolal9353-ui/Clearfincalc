import { useEffect, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

// Keep incomplete/invalid edits out of the calculation while allowing normal typing.
export default function NumberInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { value, onChange, min = 0, max = 1e12, step = 'any', ...rest } = props;
  const [draft, setDraft] = useState(String(value ?? ''));
  const [error, setError] = useState('');
  useEffect(() => { setDraft(String(value ?? '')); setError(''); }, [value]);
  const errorId = props.id ? `${props.id}-error` : undefined;
  return <span className="inline-flex min-w-0 flex-col">
    <input {...rest} type="number" value={draft} min={min} max={max} step={step}
      aria-invalid={!!error} aria-describedby={error ? errorId : props['aria-describedby']}
      onChange={event => {
        const text = event.target.value;
        const number = Number(text);
        setDraft(text);
        const valid = text.trim() !== '' && Number.isFinite(number) && number >= Number(min) && number <= Number(max);
        setError(valid ? '' : `Enter a value from ${min} to ${max}. Results use the last valid input.`);
        if (valid) onChange?.(event);
      }} />
    {error && <span id={errorId} role="alert" className="text-xs text-red-700 dark:text-red-300 max-w-64">{error}</span>}
  </span>;
}
