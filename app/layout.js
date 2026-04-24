import "./globals.css";

export const metadata = {
  title: "NovaCargo — Fast, Reliable Global Logistics",
  description:
    "Track your parcels in real-time with NovaCargo. Express delivery, international shipping, and freight services worldwide.",
  keywords: "logistics, parcel tracking, shipping, freight, express delivery",
};

/**
 * Root Layout
 * Sets up fonts via CSS variables, dark-mode class strategy, and global metadata.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Inline script to read localStorage and set dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('novacargo-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
