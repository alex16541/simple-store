import type { Metadata, Viewport } from "next";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import { AppHeader } from "@/widgets/AppHeader";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { MapsProvider } from "./MapsProvider";
import { getSession } from "@/lib/server/session";
import { fetchUserById } from "@/entity/User/server";

export const metadata: Metadata = {
  title: "Simple shop on Next.js",
  description: "Shop with Next.js",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();
  const userData = user ? await fetchUserById(user.id) : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <StoreProvider user={userData}>
              <MapsProvider>
                <CssBaseline />
                <AppHeader />
                {children}
              </MapsProvider>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
