'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setTokens, setSortBy, setCategory, TokenCategory } from '@/store/slices/tokensSlice'
import { useTokens } from '@/hooks/useTokens'
import { useWebSocket } from '@/hooks/useWebSocket'
import { TokenRow } from './token-row'
import { TableSkeleton } from './table-skeleton'
import { TokenModal } from './token-modal'
import { ArrowUpDown } from 'lucide-react'
import type { Token } from '@/store/slices/tokensSlice'

export const TokenTable = memo(() => {
  const dispatch = useDispatch()
  const { tokens, sortBy, sortOrder, selectedCategory } = useSelector((state: RootState) => state.tokens)
  const { data, isLoading, error } = useTokens(selectedCategory)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data))
    }
  }, [data, dispatch])

  useWebSocket(tokens)

  const sortedTokens = useMemo(() => {
    if (!sortBy) return tokens

    return [...tokens].sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      return 0
    })
  }, [tokens, sortBy, sortOrder])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tokens. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {(['new-pairs', 'final-stretch', 'migrated'] as TokenCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => dispatch(setCategory(category))}
            className={`px-5 py-2.5 font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600 -mb-0.5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Sort Buttons */}
      <div className="flex gap-3 flex-wrap pt-2">
        <button
          onClick={() => dispatch(setSortBy('price'))}
          className={`px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors ${
            sortBy === 'price' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          Sort by Price <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => dispatch(setSortBy('volume24h'))}
          className={`px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors ${
            sortBy === 'volume24h' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          Sort by Volume <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => dispatch(setSortBy('marketCap'))}
          className={`px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors ${
            sortBy === 'marketCap' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          Sort by Market Cap <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <div className="space-y-2.5">
              {sortedTokens.map((token) => (
                <TokenRow
                  key={token.id}
                  token={token}
                  onSelect={setSelectedToken}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TokenModal
        token={selectedToken}
        open={!!selectedToken}
        onClose={() => setSelectedToken(null)}
      />
    </div>
  )
})

TokenTable.displayName = 'TokenTable'
