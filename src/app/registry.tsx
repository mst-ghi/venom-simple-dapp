"use client"

import { CacheProvider } from "@emotion/react"
import { useEmotionCache, MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { useServerInsertedHTML } from "next/navigation"
import { useLocalStorage } from "@mantine/hooks"
import { defaultTheme } from "@/utils"
import { MainShell } from "@/components"
import { AppContextProvider } from "@/store"

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache()
  cache.compat = true

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ))

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  }

  return (
    <AppContextProvider>
      <CacheProvider value={cache}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...defaultTheme, colorScheme }}>
            <MainShell>{children}</MainShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </CacheProvider>
    </AppContextProvider>
  )
}
