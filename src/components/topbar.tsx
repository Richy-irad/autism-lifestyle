"use client";

import Link from "next/link";

import {
  Phone,
  Envelope,
  MapPin,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";

const contacts = [
  {
    icon: <MapPin size={20} weight="bold" />,
    text: "Ruaka, Kiambu",
  },
  {
    icon: <Envelope size={20} weight="bold" />,
    text: "info@autismlifestyle.org",
  },
  {
    icon: <Phone size={20} weight="bold" />,
    text: "+254 724 235049",
  },
];

const socials = [
  {
    icon: <InstagramLogo size={20} weight="bold" />,
    text: "auti_smlifestyle",
    href: "https://www.instagram.com/auti_smlifestyle/",
  },
  // {
  //   icon: <FacebookLogo size={20} weight="bold" />,
  //   text: "+254 724 235049",
  //   href: "",
  // },
];

const Topbar = () => {
  return (
    <div className="hidden lg:flex justify-between py-4 lg:px-40 w-full text-white bg-secondary">
      {/* the contacts */}
      <div className="flex gap-x-8">
        {contacts.map((contact, index) => (
          <div className="flex gap-x-2 items-center">
            {contact.icon}
            {contact.text}
          </div>
        ))}
      </div>

      {/* the socials */}
      <div className="flex gap-x-4 justify-end">
        <div className="flex gap-x-4">
          {socials.map((social, index) => (
            <div className="flex gap-x-2 items-center">
              {social.icon}
              {social.href && (
                <Link href={social.href} target="_blank">
                  {social.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
