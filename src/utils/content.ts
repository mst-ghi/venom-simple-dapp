export const truncate = (str: string, maxLength: number, location: "start" | "end" | "middle" = "middle") => {
  if (str.length <= maxLength) {
    return str
  }

  let partLength = Math.ceil((maxLength - 3) / 2)
  let startStr, endStr

  switch (location) {
    case "start":
      endStr = str.substring(str.length - maxLength + 3)
      return "..." + endStr
    case "end":
      startStr = str.substring(0, maxLength - 3)
      return startStr + "..."
    case "middle":
    default:
      startStr = str.substring(0, partLength)
      endStr = str.substring(str.length - partLength)
      return startStr + "..." + endStr
  }
}

export const previewAddress = (address?: string) => {
  if (!address) return ""
  return truncate(address, 16)
}
