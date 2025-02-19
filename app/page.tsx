'use client'

import React, { useEffect, useState } from 'react'

import fetchAllCurrencies from 'lib/api/fetch-all-currencies'
import FloatingHeader from "./FloatingHeader";
import { CurrencyResponseSchema } from 'types/public.get_all_currencies'
import { Skeleton } from 'components/ui/skeleton'

export default function Home() {
  const [currencies, setCurrencies] = useState<CurrencyResponseSchema[]>([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const { result } = await fetchAllCurrencies()
      const filteredResult = result.filter(c => ['BTC', 'ETH'].includes(c.currency))
      setCurrencies(result)
    }
    fetchCurrencies()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-6 pt-12">
      <FloatingHeader
        title="Buy Crypto Options"
      />      
      {currencies.map(currency => (
        <div key={currency.currency} className="flex justify-between w-full max-w-md">
        <span>{currency.currency}</span>
        <span>{currency.spot_price}</span>
      </div>        
      ))}
      <Skeleton className="h-[40px] w-[650px] rounded-xl" />
      <Skeleton className="h-[24px] w-[400px] rounded-xl" />
      <Skeleton className="h-[24px] w-[300px] rounded-xl" />
    </div>
  )
}
