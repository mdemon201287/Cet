// frontend/src/app/components/Footer.tsx

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
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
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                    </svg>
                                    <span>Instagram</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center space-x-2 hover:text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                    </svg>
                                    <span>X</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center space-x-2 hover:text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                    <span>LinkedIn</span>
                                </Link>
                            </li>
                            {/* Add more social media links here */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">&copy; 2024 Best Dev Shop. All right reserved</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <Link href="#" className="text-sm hover:text-blue-600">Privacy Policy</Link>
                            <Link href="#" className="text-sm hover:text-blue-600">Terms of Service</Link>
                            <Link href="#" className="text-sm hover:text-blue-600">Cookie Settings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}