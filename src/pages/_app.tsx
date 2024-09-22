import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <main>
                    <Navbar />
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </SessionProvider>
    );
}
