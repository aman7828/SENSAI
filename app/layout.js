import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#84cc16", // lime-500
          colorBackground: "#f7fadc", // soft lime/olive background
          colorText: "#1b3c2e", // dark green text
          colorTextSecondary: "#4d7c0f", // olive secondary
        },
        elements: {
          card: "bg-white/90 border border-lime-200 shadow-sm",
          button: "bg-lime-500 hover:bg-lime-600 text-white",
          input: "border-lime-200 focus:border-lime-400 focus:ring-lime-200 text-[#1b3c2e]",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-lime-50 text-[#1b3c2e]`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
