import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BVYS - Bütünleşik Vakıf Yönetim Sistemi',
  description: 'Bütünleşik Vakıf Yönetim Sistemi Merkezi Paneli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
