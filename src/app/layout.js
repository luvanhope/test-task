import StoreProvider from "./providers/StoreProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-blue-100">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
