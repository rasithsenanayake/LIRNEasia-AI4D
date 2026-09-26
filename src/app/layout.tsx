import type { Metadata } from 'next';
import { App } from '../App';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: {
    default: 'Asia AI4D Observatory',
    template: '%s | Asia AI4D Observatory'
  },
  description: 'A regional knowledge repository connecting research, data, policy, organisations and responsible AI innovation across South Asia and Southeast Asia.',
  openGraph: { type: 'website', title: 'Asia AI4D Observatory', description: 'Research and evidence on responsible AI across South Asia and Southeast Asia.' },
  twitter: { card: 'summary', title: 'Asia AI4D Observatory', description: 'Research and evidence on responsible AI across South Asia and Southeast Asia.' },
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
