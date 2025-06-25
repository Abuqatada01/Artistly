"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Artists", href: "/artists" },
  { label: "Onboard", href: "/onboard" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-teal-600">
          Artistly
        </Link>
        <nav className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${
                pathname === item.href ? "text-teal-600" : "text-gray-700"
              } hover:text-teal-500`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
