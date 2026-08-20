"use client";

import { usePathname } from "next/navigation";
import NavTab from "./NavTab";
import { ROUTES } from "./routes";

/**
 * Тооцоолуур хооронд шилжих таб.
 *
 * Client-ийн төлөв биш, ЗАМД суурилсан: URL хуваалцах, хэвлэх, буцах
 * товч бүгд ажиллана.
 */
export default function CalculatorNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b print:hidden">
      <div className="mx-auto flex max-w-4xl gap-5 px-4 sm:px-6">
        {ROUTES.map((route) => (
          <NavTab
            key={route.href}
            route={route}
            active={pathname === route.href}
          />
        ))}
      </div>
    </nav>
  );
}
