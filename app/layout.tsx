import { AnalyticsWrapper } from './components/Analytics'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="p-6 max-w-md mx-auto bg-white rounded-md select-none">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
