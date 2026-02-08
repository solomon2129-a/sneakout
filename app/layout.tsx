import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sneakout - Event Operations OS",
  description: "Make underground culture investable",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-secondary">
        {children}
      </body>
    </html>
  )
}
