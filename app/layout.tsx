export const metadata = {
  title: 'Story Generator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{"margin": "50px"}}>
        <header>
          <h1>Story Generator</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
