import type { Metadata } from 'next';
import { App } from '../App';
import '../index.css';

export const metadata: Metadata = {
  title: 'Asia AI4D Observatory',
  description: 'A policy and innovation network on responsible AI across Asia.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
