import "./globals.css";

export const metadata = {
  title: "AXDCARE | OEM/ODM Home Medical Device Manufacturer",
  description:
    "AXDCARE is a home medical device OEM/ODM manufacturer for blood pressure monitors, nebulizers and thermometers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
