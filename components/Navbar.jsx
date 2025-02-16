
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";


const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const { data: session } = useSession();

return (
  <nav className="bg-blue-950 bg-opacity-90 shadow-lg fixed top-0 w-full z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">

{/*logo */}
<div className="flex items-center">
<Image src="/logo.png" alt="Logo" width={40} height={40} />

<Link href="/" className="text-xl text-white font-bold sspace-x-4">
  Pi- <span className="text-yellow-400">  Wallet</span>
</Link>

</div>

{/* Desktop Menu */}
<div className="hidden md:flex items-center space-x-8">
<Link href="/" className="text-gray-300 hover:text-white">
              Home
</Link>
{session ? (
<>
<Link href="/wallet" className="text-gray-300 hover:text-white">
                  Wallet
</Link>
<Link href="/transactions" className="text-gray-300 hover:text-white">
                  Transactions
</Link>
<div className="relative">
<button 
    onClick={() => setIsProfileOpen(!isProfileOpen)}
    className="relative z-10 flex items-center space-x-2 focus:outline-none"
>
<img 
  src={session?.user.image || "/profile.png"} 
  alt="Profile" 
  className="w-8 h-8 rounded-full"
/>
</button>
{isProfileOpen && (
<div 
      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2"
      onClick={() => setIsProfileOpen(false)} // Close on clicking inside
>
<div className="px-4 py-2 border-b">
<p className="text-sm font-medium text-gray-800">{session.user.name}</p>
<p className="text-xs text-gray-500">{session.user.email}</p>
</div>
<Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Dashboard
</Link>
<Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Settings
</Link>
<button 
        onClick={() => signOut()}
        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white"
>
        Sign Out
</button>
</div>
  )}
</div>

</>
            ) : (
<>
<Link href="/auth/signin" className="text-gray-300 hover:text-white">
                  Sign In
</Link>
<Link href="/auth/register" className="text-gray-300 hover:text-white">
                  Register
</Link>
</>
            )}
</div>

{/* Mobile Menu */}
<div className="flex items-center md:hidden">
{session ? (
<button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
>
<img 
  src={session?.user.image || "/profile.png"} 
  alt="Profile" 
  className="w-8 h-8 rounded-full"
/>
</button>
            ) : (
<button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
>
<svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
>
{isOpen ? (
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
</svg>
</button>
            )}
</div>
</div>

{/* Mobile Menu Dropdown */}
{isOpen && (
<div className="md:hidden">
<div className="pt-2 pb-3 space-y-1">
<Link href="/" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                Home
</Link>
{session ? (
<>
<Link href="/wallet" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Wallet
</Link>
<Link href="/transactions" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Transactions
</Link>
<Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Dashboard
</Link>
<Link href="/settings" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Settings
</Link>
<button 
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
>
                    Sign Out
</button>
</>
              ) : (
<>
<Link href="/auth/signin" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Sign In
</Link>
<Link href="/auth/register" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">
                    Register
</Link>
</>
              )}
</div>
</div>
        )}
</div>
</nav>
  );
};

export default Navbar;