"use client"

import React from "react"
import AppContext, { AppStateProps, useInitData } from "./appContext"

const AppContextProvider = ({ children, value }: { children: React.ReactNode; value?: Partial<AppStateProps> }) => {
  return <AppContext.Provider value={useInitData({ value }) as any}>{children}</AppContext.Provider>
}

export default AppContextProvider
