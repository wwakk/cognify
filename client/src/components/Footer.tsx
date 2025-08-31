// Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-6 flex flex-col items-center gap-2 mt-16">
      <p className="opacity-70">© 2025 Cognify. All rights reserved.</p>
      <div className="flex gap-4">
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
