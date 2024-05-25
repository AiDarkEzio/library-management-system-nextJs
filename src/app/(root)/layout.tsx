import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
     <div className="bg-gray-800 text-white h-screen overflow-hidden">
      {children}
    </div>
    </main>
  );
}
