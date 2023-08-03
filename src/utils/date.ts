import dayjs from "dayjs"

export const unixToDate = (unix: number) => {
  return dayjs.unix(unix).format("YYYY-MM-DD HH:mm:ss")
}
