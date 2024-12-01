// frontend/src/app/layout.tsx

"use client";  // <-- Ensure this line is present

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <header className="bg-gray-300 text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/">
                <Image src="/images/logo.png" alt="Best Dev Shop Logo" width={150} height={50} />
              </Link>
              <nav className="space-x-4">
                <Link href="/agencies">Agencies</Link>
                <Link href="/development">Development</Link>
                <Link href="/it-services">IT Services</Link>
                <Link href="/marketing">Marketing</Link>
                <Link href="/design">Design</Link>
                <Link href="/business-services">Business Services</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white text-gray-700">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <Image src="/images/logo.png" alt="Logo" width={256} height={256} className="mb-2" />
                  <p className="text-sm">Join our newsletter to stay up to date on features and agency.</p>
                  <div className="flex">
                    <input type="email" placeholder="username@site.com" className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-900 transition duration-300">Subscribe</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Contact Us</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">News and Blog</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">FAQs</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Reviews</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-blue-600">Categories</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Get Listed</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Agencies</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Companies</Link></li>
                    <li><Link href="#" className="hover:text-blue-600">Link Ten</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        <span>Facebook</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.135.008-2.389.047-3.231.035-.78.166-1.204.275-.276.145-.373.319-.64.599-.92.28-.28.547-.453.92-.599.283-.109.706-.24 1.486-.275.843-.039 1.096-.046 3.232-.046z" />
                        </svg>
                        <span>Instagram</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </AuthProvider>
  );
}
