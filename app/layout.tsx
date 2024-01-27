import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react';
import NavBar from '@/components/NavBar'
import Footer from "@/components/Footer"
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'DeazyQR.',
  description: 'The fastest way to Generate Dynamic QR codes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <NavBar/>  
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Footer/>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
