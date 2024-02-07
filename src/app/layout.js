import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Work Manager",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        <Navbar />
        <div className="mt-2">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
