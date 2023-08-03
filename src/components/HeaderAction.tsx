import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown } from "@tabler/icons-react"
import VenomLogo from "./VenomLogo"
import { useApp } from "@/store"
import HeaderWallet from "./HeaderWallet"
import Link from "next/link"
import { createStyles, Menu, Center, Header, Container, Group, Button, Burger, rem, Flex } from "@mantine/core"

const HEADER_HEIGHT = rem(60)

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}))

export interface HeaderLink {
  link: string
  label: string
  links?: { link: string; label: string }[]
}

interface HeaderActionProps {
  links: HeaderLink[]
}

const HeaderAction = ({ links }: HeaderActionProps) => {
  const { wallet, onWalletConnect } = useApp()

  const { classes } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>)

    if (menuItems) {
      return (
        <Menu key={link.label} trigger='hover' transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    )
  })

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120} bg='#141517'>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
          <VenomLogo />
        </Group>

        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Flex direction='row' justify='center' align='center' gap='sm'>
          {wallet?.address && <HeaderWallet />}

          {!wallet?.address && <Button onClick={onWalletConnect}>Connect</Button>}
        </Flex>
      </Container>
    </Header>
  )
}

export default HeaderAction
