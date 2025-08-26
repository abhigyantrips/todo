import { Navbar, NavbarBrand, NavbarContent } from '@heroui/react';

import Link from 'next/link';

export function Header() {
  return (
    <Navbar maxWidth="full" height="6rem" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <Link className="flex items-center justify-start gap-1" href="/">
            <p className="font-branding text-3xl text-inherit italic">
              TaskMaster 5000<sub>(Lite)</sub>
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        Settings, Tags
      </NavbarContent>
    </Navbar>
  );
}
