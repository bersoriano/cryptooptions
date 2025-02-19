'use client'

import React, { useEffect, useState } from 'react'

import fetchAllCurrencies from 'lib/api/fetch-all-currencies'
import fetchInstruments from 'lib/api/fetch-instruments'
import FloatingHeader from "./FloatingHeader";
import { CurrencyResponseSchema } from 'types/public.get_all_currencies'
import { Skeleton } from 'components/ui/skeleton'
import { PublicGetInstrumentsResponseSchema } from 'types/public.get_instruments'

export default function Home() {
  const [currencies, setCurrencies] = useState<CurrencyResponseSchema[]>([])
  const [instruments, setInstruments] = useState<PublicGetInstrumentsResponseSchema['result']>([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const { result } = await fetchAllCurrencies()
      const filteredResult = result.filter(c => ['BTC', 'ETH'].includes(c.currency))
      setCurrencies(result)
    }
    fetchCurrencies();

    const fetchInstrumentsData = async () => {
      const { result } = await fetchInstruments({
        currency: 'BTC',
        instrument_type: 'option',
        expired: false
      });
      setInstruments(result)
    }
    fetchInstrumentsData()    
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-6 pt-12">
      <FloatingHeader
        title="Buy Crypto Options"
      />
      <span>All currencies:</span>      
      {currencies.map(currency => (
        <div key={currency.currency} className="flex justify-between w-full max-w-md">
        <span>{currency.currency}</span>
        <span>{currency.spot_price}</span>
      </div>        
      ))}
      <span>All Instruments:</span>      
      {instruments.map(instrument => (
        <div key={instrument.instrument_name} className="flex justify-between w-full max-w-md">
          <span>{instrument.option_details?.index}</span>
          <span>{new Date(instrument.option_details?.expiry * 1000).toLocaleDateString()}</span>
          <span>{instrument.option_details?.strike}</span>
        </div>
      ))}      
      <Skeleton className="h-[40px] w-[650px] rounded-xl" />
      <Skeleton className="h-[24px] w-[400px] rounded-xl" />
      <Skeleton className="h-[24px] w-[300px] rounded-xl" />
    </div>
  )
}
