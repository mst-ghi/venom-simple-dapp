import { useApp } from "@/store"
import { currency, previewAddress } from "@/utils"
import { Avatar, Menu, Text, Tooltip } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"

const HeaderWallet = () => {
  const { wallet, onDisconnect } = useApp()

  if (!wallet || !wallet.address) {
    return null
  }

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Avatar />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Tooltip label={wallet?.address}>
            <Text size='md' fw={600}>
              {previewAddress(wallet?.address)}
            </Text>
          </Tooltip>
        </Menu.Label>
        <Menu.Label>
          <Text size='md' fw={600}>
            {currency(wallet?.balance)}
          </Text>
        </Menu.Label>
        <Menu.Item icon={<IconLogout size={14} />} onClick={onDisconnect}>
          Disconnect
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderWallet
