'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateTokenPrice } from '@/store/slices/tokensSlice';

export function useWebSocket(tokens: Array<{ id: string }>) {
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (tokens.length > 0) {
        const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
        dispatch(
          updateTokenPrice({
            id: randomToken.id,
            price: Math.random() * 100,
            priceChange24h: (Math.random() - 0.5) * 20,
          })
        );
      }
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tokens, dispatch]);
}
