import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Hydration Break",
  description: "Learn the world before play resumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased font-sans ${geist.variable}`}>
      <body className="min-h-screen bg-[#161920] text-[#12243a]">
        <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#efe9d8] shadow-[0_0_0_1px_rgba(18,36,58,0.08),0_24px_80px_rgba(0,0,0,0.28)]">
          {children}
        </main>
      </body>
    </html>
  );
}
