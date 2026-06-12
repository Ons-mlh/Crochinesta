import "./globals.css";
import {
  IM_Fell_French_Canon_SC,
} from "next/font/google";
import NavBar from "../components/layout/NavBar";

const headingFont = IM_Fell_French_Canon_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={headingFont.variable}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}