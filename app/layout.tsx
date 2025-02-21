"use client"
import Footer from "@/components/site-wide/footer";
import SidebarContainer from "@/components/site-wide/sidebar/sidebar-provider";
import HydrateSite from "@/components/site-wide/site-hydration";
import LenisProvider from "@/components/site-wide/smooth-scrolling";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SanskritiStoreProvider } from "@/store/store-provider";
import {
  ClerkProvider
} from '@clerk/nextjs';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            // `${geistSans.variable} ${geistMono.variable} antialiased`
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >

            <SanskritiStoreProvider>
              <HydrateSite />
              <SidebarContainer>
                <LenisProvider>
                  {children}
                  <Footer />
                </LenisProvider>
              </SidebarContainer>
            </SanskritiStoreProvider>

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
