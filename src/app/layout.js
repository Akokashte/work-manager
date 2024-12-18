import localFont from "next/font/local";
import "./globals.css";
import CustomNavbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import UserProvider from "@/context/userProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
 name:"viewport",
 content:"width=device-width, initial-scale=1.0"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <UserProvider>
          <div className="flex flex-col">
            <CustomNavbar />
            <div className="my-2">
              {children}
            </div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
