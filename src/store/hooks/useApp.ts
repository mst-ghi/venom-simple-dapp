import useAppContext from "./useAppContext"

const useApp = () => {
  const states = useAppContext()
  return states
}

export default useApp
