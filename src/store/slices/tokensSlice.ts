import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated'

export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  contractAddress: string
  category: TokenCategory
  timestamp: number
}

interface TokensState {
  tokens: Token[]
  sortBy: keyof Token | null
  sortOrder: 'asc' | 'desc'
  selectedCategory: TokenCategory
  loading: boolean
  error: string | null
}

const initialState: TokensState = {
  tokens: [],
  sortBy: null,
  sortOrder: 'desc',
  selectedCategory: 'new-pairs',
  loading: false,
  error: null,
}

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload
      state.loading = false
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id)
      if (token) {
        token.price = action.payload.price
        token.priceChange24h = action.payload.priceChange24h
      }
    },
    setSortBy: (state, action: PayloadAction<keyof Token | null>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortBy = action.payload
        state.sortOrder = 'desc'
      }
    },
    setCategory: (state, action: PayloadAction<TokenCategory>) => {
      state.selectedCategory = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setTokens, updateTokenPrice, setSortBy, setCategory, setLoading, setError } = tokensSlice.actions
export default tokensSlice.reducer
