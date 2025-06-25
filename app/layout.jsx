import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
export const metadata = {
  title: "Artistly",
  description: "Book verified artists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
