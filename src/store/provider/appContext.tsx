import { initVenomConnect } from "@/utils"
import {
  Address,
  ProviderRpcClient,
  Transaction,
  TransactionId,
  TransactionsBatchInfo,
} from "everscale-inpage-provider"
import { createContext, useEffect, useState } from "react"
import { VenomConnect } from "venom-connect"

type WalletAccount = {
  address?: string
  balance?: string
  data?: {
    transactions: Transaction<Address>[]
    continuation: undefined | TransactionId
    info?: TransactionsBatchInfo
  }
}

export type AppStateProps = {
  venomConnect?: VenomConnect
  venomProvider?: ProviderRpcClient
  authorized?: boolean
  wallet?: WalletAccount
}

export interface AppProps extends AppStateProps {
  setVenomConnect: (venomConnect?: VenomConnect) => void
  setVenomProvider: (venomProvider?: ProviderRpcClient) => void
  setAuthorized: (authorized?: boolean) => void
  setWallet: (wallet?: WalletAccount) => void
  onDisconnect: () => void
  onWalletConnect: () => void
}

export const useInitData = ({ value }: { value?: Partial<AppStateProps> }) => {
  const [venomConnect, setVenomConnect] = useState<VenomConnect>()
  const [venomProvider, setVenomProvider] = useState<ProviderRpcClient>()
  const [authorized, setAuthorized] = useState<boolean>()
  const [wallet, setWallet] = useState<WalletAccount>()

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

  const onWalletConnect = async () => {
    if (!venomConnect) return
    await venomConnect.connect()
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
    venomConnect,
    setVenomConnect,
    venomProvider,
    setVenomProvider,
    authorized,
    setAuthorized,
    wallet,
    setWallet,
    onDisconnect,
    onWalletConnect,
  }
}

const AppContext = createContext<AppProps | undefined>(undefined)

export default AppContext
