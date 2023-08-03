export const currency = (fee?: string) => {
  if (!fee) return "0 Venom"
  return (Number(fee) / 1_000_000_000).toFixed(6) + " Venom"
}
