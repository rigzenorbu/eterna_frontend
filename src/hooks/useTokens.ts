'use client';

import { useQuery } from '@tanstack/react-query';
import { Token, TokenCategory } from '@/store/slices/tokensSlice';

async function fetchTokens(category: TokenCategory): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 1000));

  return Array.from({ length: 20 }, (_, i) => ({
    id: `token-${category}-${i}`,
    name: `Token ${i + 1}`,
    symbol: `TK${i + 1}`,
    price: Math.random() * 100,
    priceChange24h: (Math.random() - 0.5) * 20,
    volume24h: Math.random() * 1e7,
    marketCap: Math.random() * 1e8,
    liquidity: Math.random() * 5e6,
    holders: Math.floor(Math.random() * 10000),
    contractAddress: `0x${Math.random().toString(16).slice(2, 42).padEnd(40, '0')}`,
    category,
    timestamp: Date.now(),
  }));
}

export function useTokens(category: TokenCategory) {
  return useQuery({
    queryKey: ['tokens', category],
    queryFn: () => fetchTokens(category),
    staleTime: 30_000,
  });
}
