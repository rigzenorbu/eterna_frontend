'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Token } from '@/store/slices/tokensSlice'
import { formatNumber, formatPercentage } from '@/lib/utils'

interface TokenModalProps {
  token: Token | null
  open: boolean
  onClose: () => void
}

export function TokenModal({ token, open, onClose }: TokenModalProps) {
  if (!token) return null

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {token.name}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600 mb-1">Price</p>
                <p className="text-lg font-bold">{formatNumber(token.price)}</p>
                <p className={`text-sm font-medium ${token.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(token.priceChange24h)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600 mb-1">Market Cap</p>
                <p className="text-lg font-bold">{formatNumber(token.marketCap)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600 mb-1">24h Volume</p>
                <p className="text-lg font-bold">{formatNumber(token.volume24h)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600 mb-1">Liquidity</p>
                <p className="text-lg font-bold">{formatNumber(token.liquidity)}</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-600 mb-1">Contract Address</p>
              <p className="text-sm font-mono break-all">{token.contractAddress}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-600 mb-1">Holders</p>
              <p className="text-lg font-bold">{token.holders.toLocaleString()}</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
