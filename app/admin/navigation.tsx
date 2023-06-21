"use client";

import { usePathname } from "next/navigation";

interface Link {
  href: string;
  name: string;
}

export function Navigation() {
  const links: Link[] = [
    {
      href: "/admin/teams",
      name: "Teams",
    },
    {
      href: "/admin/questions",
      name: "Questions",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="navbar px-10 shadow-xl gap-x-2">
      <h3 className="text-xl flex-1">Price is Precise</h3>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <a
            key={link.name}
            href={link.href}
            className={
              "btn btn-sm" + (isActive ? " btn-accent" : " btn-neutral")
            }
          >
            {link.name}
          </a>
        );
      })}
    </div>
  );
}
