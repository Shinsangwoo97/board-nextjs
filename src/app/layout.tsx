'use client';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './Providers';
import { RecoilRoot } from 'recoil';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html className='h-full scroll-smooth'>
        <head />
        <body>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </RecoilRoot>
  );
}
