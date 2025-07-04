import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WarehousePro+',
  description: 'Smart Inventory & Billing System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        {/* Global Toast Notifications */}
        <Toaster position="top-right" />

        {children}
      </body>
    </html>
  )
}




