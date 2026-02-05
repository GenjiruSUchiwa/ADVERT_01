import { Geist } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "ADVERT",
  description: "Brand Strategy Co-Pilot",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
