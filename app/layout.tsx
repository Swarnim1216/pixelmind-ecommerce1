// app/layout.tsx
import './globals.css'
import { ReactQueryClientProvider } from './react-query-wrapper'

export const metadata = {
  title: 'PixelMind E-commerce',
  description: 'Frontend assignment using Next.js App Router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
