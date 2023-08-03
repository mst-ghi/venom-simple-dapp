import React from "react"
import { AppShell } from "@mantine/core"
import HeaderAction, { HeaderLink } from "./HeaderAction"

type MainShellProps = {
  children?: React.ReactNode
}

const Links: HeaderLink[] = [
  { label: "Home", link: "/" },
  { label: "Transactions", link: "/transactions" },
]

const MainShell = ({ children }: MainShellProps) => {
  return (
    <AppShell
      padding='md'
      // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      header={<HeaderAction links={Links} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  )
}

export default MainShell
