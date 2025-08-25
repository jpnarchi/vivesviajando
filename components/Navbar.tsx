"use client"

import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={80} height={40} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden" onClick={() => router.push('/contacto')}>
        <Button 
          type="button"
          title="¡Contáctanos!"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>

      <Image 
        src={isMobileMenuOpen ? "/close.svg" : "/menu.svg"}
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Menú</h3>
              <Image 
                src="/close.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={closeMobileMenu}
              />
            </div>
            
            <ul className="p-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link 
                    href={link.href} 
                    className="regular-16 text-gray-800 block py-2 transition-all hover:text-green-600"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="p-4 border-t">
              <Button 
                type="button"
                title="¡Contáctanos!"
                icon="/user.svg"
                variant="btn_dark_green"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar