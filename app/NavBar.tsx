"use client";
import { Skeleton } from "@/app/components";
import {
  Avatar,
  Container,
  DropdownMenu,
  Flex,
  Text
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              {" "}
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStaus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStaus = () => {
  // to add login and logout links we have to use useSession() hook provided by next auth
  const { status, data: session } = useSession();
  // staus - which can me authenticated | unauthenticated | loading
  // data: session -  with this we can get name, email and image

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }
  if (status == "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );
  }

  return (
    <Flex>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="2">
            <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </Text>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default NavBar;
