import Link from "next/link";
import {
  TwitterLogo,
  InstagramLogo,
  FacebookLogo,
  Copyright,
} from "@phosphor-icons/react";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

export default function Footer() {
  return (
    <footer className="bg-concrete">
      <div className="lg:container lg:mx-auto">
        <div className="px-5 lg:px-0 py-6 lg:mx-20">
          <div className="flex gap-x-6 justify-start lg:justify-between mb-10">
            {/* sitemap */}
            <div className="basis-full md:basis-1/2 lg:basis-1/4 flex gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-dark hover:text-primary font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* socials */}
            <div className="flex gap-x-6 items-center">
              <Link href="#" className="text-dark hover:text-primary">
                <FacebookLogo size={32} />
              </Link>
              <Link href="#" className="text-dark hover:text-primary">
                <InstagramLogo size={32} />
              </Link>
            </div>
          </div>

          <hr className="my-8" />

          {/* copyright */}
          <div className="flex gap-0.5 items-center">
            <Copyright size={20} /> Autism Lifestyle. All rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
