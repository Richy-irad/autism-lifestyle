import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { Basket, List, X } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import { CartContext } from "@/lib/contexts/CartContext";

type CustomLinkProps = {
  children: ReactNode;
  href: Url;
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({ children, href }: CustomLinkProps) => {
  const router = useRouter();

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        className={classNames(
          router.asPath === href
            ? "text-primary font-bold"
            : "text-dark hover:text-primary font-medium",
          "px-4"
        )}
      >
        {children}
      </Link>
    </>
  );
};

export default function Navbar() {
  const cart = useContext(CartContext);
  return (
    <Disclosure as="nav" className="bg-white font-josefin-sans">
      {({ open }) => (
        <>
          <div className="px-5 lg:px-0 py-6 lg:mx-40">
            <div className="flex items-center justify-start gap-2">
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center text-dark">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <List className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                  <Link href="/" className="font-bold text-2xl flex gap-2">
                    <span className="text-primary capitalize">autism</span>
                    <span className="text-monte capitalize">lifestyle</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-4">
                    {navigation.map((item) => (
                      <CustomLink key={item.name} href={item.href}>
                        {item.name}
                      </CustomLink>
                    ))}
                    <CustomLink href="/cart">
                      <div className="flex gap-x-0.5">
                        <Basket size={24} />
                        {cart && <>({cart.items.length})</>}
                      </div>
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex flex-col">
              {navigation.map((item) => (
                <CustomLink key={item.name} href={item.href}>
                  {item.name}
                </CustomLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
