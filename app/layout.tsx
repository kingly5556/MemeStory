import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/components/nav.component/Nav";
import Footer from "@/components/footer.component/Footer";
import Body from "@/components/Body";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
          <Nav/>
          <Body/>
          {children}
          <Footer/>
    </html>
  );
}
