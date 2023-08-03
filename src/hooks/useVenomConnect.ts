"use client"

import { initVenomConnect } from "@/utils"
import { useEffect, useState } from "react"
import { VenomConnect } from "venom-connect"
import {
  Address,
  ProviderRpcClient,
  Transaction,
  TransactionId,
  TransactionsBatchInfo,
} from "everscale-inpage-provider"

type TWalletInfo = {
  address?: string
  balance?: string
  data?: {
    transactions: Transaction<Address>[]
    continuation: undefined | TransactionId
    info?: TransactionsBatchInfo
  }
}

const useVenomConnect = () => {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>()
  const [venomProvider, setVenomProvider] = useState<ProviderRpcClient>()
  const [authorized, setAuthorized] = useState<boolean>()
  const [wallet, setWallet] = useState<TWalletInfo>()

  const init = async () => {
    const vc = await initVenomConnect()
    setVenomConnect(vc)
  }

  const onConnect = async (provider: any) => {
    setVenomProvider(provider)
  }

  const onDisconnect = async () => {
    await venomProvider?.disconnect()
    setWallet(undefined)
  }

  const checkAuth = async (_venomConnect: VenomConnect) => {
    const auth = await _venomConnect?.checkAuth()
    setAuthorized(Boolean(auth))
  }

  const fillAccountInfo = async () => {
    const providerState = await venomProvider?.getProviderState?.()

    let balance
    let data
    const address = providerState?.permissions.accountInteraction?.address

    if (address) {
      balance = await venomProvider?.getBalance(address)
      data = await venomProvider?.getTransactions({ address })
    }

    setWallet({
      address: address?.toString(),
      balance,
      data,
    })
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const off = venomConnect?.on("connect", onConnect)

    if (venomConnect) {
      checkAuth(venomConnect)
    }

    return () => {
      off?.()
    }
  }, [venomConnect])

  useEffect(() => {
    if (authorized && venomProvider) {
      fillAccountInfo()
    }
  }, [authorized, venomProvider])

  return {
    states: {
      venomConnect,
      venomProvider,
      authorized,
      wallet,
    },
    actions: {
      setVenomConnect,
      setVenomProvider,
      setAuthorized,
      setWallet,
      onDisconnect,
    },
  }
}

export default useVenomConnect
