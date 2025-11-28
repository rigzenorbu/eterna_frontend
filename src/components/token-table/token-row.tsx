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
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(token.contractAddress)
  }

  return (
    <div 
      className="grid grid-cols-[48px_200px_140px_120px_120px_110px_100px] items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer h-16"
      onClick={() => onSelect(token)}
    >
      {/* 1. Icon */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {token.symbol.slice(0, 2)}
      </div>

      {/* 2. Token Name & Address */}
      <div className="space-y-1 truncate">
        <div className="font-semibold text-gray-900 text-sm truncate" title={token.name}>{token.name}</div>
        <div className="flex items-center gap-1">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-mono truncate max-w-[100px]" title={token.contractAddress}>
                {shortenAddress(token.contractAddress, 4)}
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="bg-white p-3 rounded-lg shadow-xl border z-50 w-80">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-900">Contract Address</p>
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono bg-gray-50 px-2 py-1 rounded w-full break-all">{token.contractAddress}</code>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </div>
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>

      {/* 3. Price */}
      <PriceCell price={token.price} priceChange24h={token.priceChange24h} />

      {/* 4. Volume */}
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <div className="text-right">
              <div className="font-semibold text-sm text-gray-900">{formatNumber(token.volume24h)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Vol</div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs shadow-lg z-50 whitespace-nowrap">
              ${token.volume24h.toLocaleString()}
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* 5. Market Cap */}
      <div className="text-right">
        <div className="font-semibold text-sm text-gray-900">{formatNumber(token.marketCap)}</div>
        <div className="text-xs text-gray-500 mt-0.5">Mkt Cap</div>
      </div>

      {/* 6. Liquidity */}
      <div className="text-right">
        <div className="font-semibold text-sm text-gray-900">{formatNumber(token.liquidity)}</div>
        <div className="text-xs text-gray-500 mt-0.5">Liq</div>
      </div>

      {/* 7. Holders */}
      <div className="text-right">
        <div className="font-semibold text-sm text-gray-900">{token.holders.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-0.5">Holders</div>
      </div>
    </div>
  )
})

TokenRow.displayName = 'TokenRow'
