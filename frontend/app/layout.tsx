import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/ReduxProvider"
import { Toaster } from "react-hot-toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "RestroVibe - Restaurant Management System",
  description: "Complete restaurant management solution for modern businesses",
  generator: "RestroVibe",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <ReduxProvider>
                <Suspense fallback={null}>{children}</Suspense>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'hsl(var(--background))',
                      color: 'hsl(var(--foreground))',
                      border: '1px solid hsl(var(--border))',
                    },
                    success: {
                      iconTheme: {
                        primary: 'hsl(var(--primary))',
                        secondary: 'hsl(var(--primary-foreground))',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'hsl(var(--destructive))',
                        secondary: 'hsl(var(--destructive-foreground))',
                      },
                    },
                  }}
                />
              </ReduxProvider>
            </ThemeProvider>
            <Analytics />
      </body>
    </html>
  )
}
