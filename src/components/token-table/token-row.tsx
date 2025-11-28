'use client'

import { memo } from 'react'
import { Token } from '@/store/slices/tokensSlice'
import { PriceCell } from './price-cell'
import { formatNumber, shortenAddress } from '@/lib/utils'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as Popover from '@radix-ui/react-popover'
import { Copy } from 'lucide-react'

interface TokenRowProps {
  token: Token
  onSelect: (token: Token) => void
}

export const TokenRow = memo(({ token, onSelect }: TokenRowProps) => {
  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
  }

  return (
    <div 
      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onSelect(token)}
    >
      {/* Token Icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
        {token.symbol.slice(0, 2)}
      </div>
      
      {/* Token Info */}
      <div className="flex-shrink-0 mr-6" style={{ width: '180px' }}>
        <div className="font-semibold text-gray-900 text-base mb-1">{token.name}</div>
        <div className="text-sm text-gray-500 mb-1">{token.symbol}</div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button 
              className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {shortenAddress(token.contractAddress)}
              <Copy className="w-3 h-3" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content 
              className="bg-white p-3 rounded-lg shadow-xl border border-gray-200 z-50 min-w-[280px]"
              sideOffset={5}
            >
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-medium">Contract Address</p>
                <p className="text-xs font-mono bg-gray-50 p-2 rounded break-all">{token.contractAddress}</p>
                <button
                  onClick={(e) => copyToClipboard(e, token.contractAddress)}
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 w-full justify-center py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy Address
                </button>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 mr-8" style={{ width: '140px' }}>
        <PriceCell price={token.price} priceChange24h={token.priceChange24h} />
      </div>

      {/* Volume */}
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="flex-shrink-0 text-right mr-8" style={{ width: '120px' }}>
              <div className="text-sm font-semibold text-gray-900 mb-1">{formatNumber(token.volume24h)}</div>
              <div className="text-xs text-gray-500">Volume</div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="bg-gray-900 text-white px-3 py-2 rounded text-sm z-50 max-w-xs"
              sideOffset={5}
            >
              24h Trading Volume: ${token.volume24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Market Cap */}
      <div className="flex-shrink-0 text-right mr-8" style={{ width: '130px' }}>
        <div className="text-sm font-semibold text-gray-900 mb-1">{formatNumber(token.marketCap)}</div>
        <div className="text-xs text-gray-500">Market Cap</div>
      </div>

      {/* Liquidity */}
      <div className="flex-shrink-0 text-right mr-8" style={{ width: '120px' }}>
        <div className="text-sm font-semibold text-gray-900 mb-1">{formatNumber(token.liquidity)}</div>
        <div className="text-xs text-gray-500">Liquidity</div>
      </div>

      {/* Holders */}
      <div className="flex-shrink-0 text-right" style={{ width: '100px' }}>
        <div className="text-sm font-semibold text-gray-900 mb-1">{token.holders.toLocaleString()}</div>
        <div className="text-xs text-gray-500">Holders</div>
      </div>
    </div>
  )
})

TokenRow.displayName = 'TokenRow'
