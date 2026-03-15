import { useState, useEffect } from 'react';

let cachedCountry: string | null = null;
let fetchPromise: Promise<string> | null = null;

export function useCountry() {
  const [country, setCountry] = useState<string | null>(cachedCountry);

  useEffect(() => {
    if (cachedCountry) {
      setCountry(cachedCountry);
      return;
    }
    if (!fetchPromise) {
      fetchPromise = fetch('https://api.country.is/')
        .then(res => res.json())
        .then(data => {
          cachedCountry = data.country;
          return data.country;
        })
        .catch(e => {
          console.error('Country check failed:', e);
          cachedCountry = 'UNKNOWN';
          return 'UNKNOWN';
        });
    }
    fetchPromise.then(c => setCountry(c));
  }, []);

  return country;
}
