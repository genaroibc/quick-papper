import { Header } from "./components/Header/Header";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
