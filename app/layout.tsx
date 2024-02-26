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
  title: "MemeStory",
  description: "all around the world meme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="sunset" lang="en" className={GeistSans.className}>
          <Nav/>
          {children}
          <Footer/>
    </html>
  );
}
