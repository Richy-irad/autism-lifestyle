import { useRouter } from "next/router";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { List, X } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";

type CustomLinkProps = {
  children: ReactNode;
  href: Url;
};

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
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
  return (
    <Disclosure as="nav" className="bg-white lg:container lg:mx-auto">
      {({ open }) => (
        <>
          <div className="px-5 lg:px-0 py-6 lg:mx-20">
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
                  <Link href="#" className="font-bold text-2xl flex gap-2">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex flex-col">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-primary font-bold"
                      : "text-dark hover:text-primary font-medium",
                    "px-4 py-2.5"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
