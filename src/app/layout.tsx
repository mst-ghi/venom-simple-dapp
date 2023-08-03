import "@/styles/globals.css"
import RootStyleRegistry from "./registry"

export const metadata = {
  title: "Venom Simple App",
  description:
    "Venom Blockchain: Decentralized, Secure, Scalable. Smart Contracts & Tokenization. Empowering Innovation & Privacy.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  )
}
