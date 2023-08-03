import { useContext } from "react"

import { AppContext } from "../provider"

const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }
  return context
}

export default useAppContext
