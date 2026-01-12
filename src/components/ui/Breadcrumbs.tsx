import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <Link href="/" className="hover:text-[#2d5a27] transition-colors flex items-center gap-1">
        <Home className="w-3 h-3 mb-0.5" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link 
            href={item.href}
            className={`transition-colors ${
              index === items.length - 1 
                ? "text-[#2d5a27] pointer-events-none" 
                : "hover:text-[#2d5a27]"
            }`}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
