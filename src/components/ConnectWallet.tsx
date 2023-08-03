"useClient"

import { Button } from "@mantine/core"
import React from "react"
import { VenomConnect } from "venom-connect"

type Props = {
  venomConnect: VenomConnect | undefined
}

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return
    await venomConnect.connect()
  }

  return (
    <Button variant='outline' onClick={login}>
      Connect wallet
    </Button>
  )
}

export default ConnectWallet
