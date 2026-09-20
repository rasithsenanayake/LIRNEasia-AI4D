import type { Metadata } from 'next';
import { App } from '../App';
import '../index.css';

export const metadata: Metadata = {
  title: 'Asia AI4D Observatory',
  description: 'A policy and innovation network on responsible AI across Asia.',
  icons: {
    icon: '/imagers/fav%20icon.png',
    shortcut: '/imagers/fav%20icon.png',
    apple: '/imagers/fav%20icon.png'
  }
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
