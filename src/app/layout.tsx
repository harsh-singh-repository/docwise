import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ConvexClientProvider } from "@/components/ui/provider/convex.provider";
import "./globals.css";
import { ThemeProvider } from "next-themes";


import { Toaster } from "sonner";
import { ModalProvider } from "@/components/ui/provider/modal.provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Poppins({ subsets: ["latin"],weight:['400','600'] });

export const metadata: Metadata = {
  title: "Docwise",
  description: "A wokspace where user can collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="jotion-theme-2"
            >
              <Toaster position="bottom-center"/>
              <ModalProvider/>
                  {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
