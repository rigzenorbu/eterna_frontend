'use client'

import { Token } from '@/store/slices/tokensSlice'
import { formatNumber } from '@/lib/utils'

interface TokenModalProps {
  token: Token | null
  open: boolean
  onClose: () => void
}

export function TokenModal({ token, open, onClose }: TokenModalProps) {
  if (!token || !open) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all z-10"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{token.name}</h2>
            <p className="text-xl text-gray-500 mt-1">{token.symbol}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Price & Address */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border">
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Price</div>
                <div className="text-2xl font-bold text-gray-900">{formatNumber(token.price)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">24h Change</div>
                <div className={`text-xl font-bold ${token.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h3 className="font-semibold text-lg mb-4">Contract Address</h3>
              <div className="flex items-center gap-3">
                <code className="flex-1 px-4 py-3 bg-white border rounded-xl font-mono text-sm break-all">
                  {token.contractAddress}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(token.contractAddress)}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg"
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border">
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Volume 24h</div>
                <div className="text-xl font-bold text-gray-900">{formatNumber(token.volume24h)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Market Cap</div>
                <div className="text-xl font-bold text-gray-900">{formatNumber(token.marketCap)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border">
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Liquidity</div>
                <div className="text-xl font-bold text-gray-900">{formatNumber(token.liquidity)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Holders</div>
                <div className="text-xl font-bold text-gray-900">{token.holders.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
