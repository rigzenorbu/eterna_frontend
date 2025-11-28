'use client'

import { memo, useEffect, useState } from 'react'
import { cn, formatNumber, formatPercentage } from '@/lib/utils'

interface PriceCellProps {
  price: number
  priceChange24h: number
}

export const PriceCell = memo(({ price, priceChange24h }: PriceCellProps) => {
  const [animationClass, setAnimationClass] = useState('')
  const [prevPrice, setPrevPrice] = useState(price)

  useEffect(() => {
    if (price !== prevPrice) {
      const isIncrease = price > prevPrice
      setAnimationClass(isIncrease ? 'bg-green-100' : 'bg-red-100')
      
      const timer = setTimeout(() => setAnimationClass(''), 500)
      setPrevPrice(price)
      
      return () => clearTimeout(timer)
    }
  }, [price, prevPrice])

  return (
    <div className={cn('transition-colors duration-500 rounded-lg px-3 py-2', animationClass)}>
      <div className="font-bold text-gray-900 text-base">{formatNumber(price)}</div>
      <div className={cn(
        'text-sm font-semibold',
        priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
      )}>
        {formatPercentage(priceChange24h)}
      </div>
    </div>
  )
})

PriceCell.displayName = 'PriceCell'
