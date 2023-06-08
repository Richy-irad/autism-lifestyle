import React, { FC } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllPackages } from "@/lib/packages";
import { ServicesProps } from "@/lib/types";

import Service from "@/components/package";

export async function getStaticProps() {
  const packages = getAllPackages();

  return {
    props: {
      packages,
    },
  };
}

const Services: FC<ServicesProps> = ({ packages }): JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="font-josefin-sans">
        {/* services section */}
        <div className="flex gap-y-12 lg:gap-x-32 items-start px-5 lg:mx-40 py-20 flex-wrap lg:flex-nowrap">
          <div className="basis-full lg:basis-5/12">
            <div className="flex flex-col gap-y-3 lg:gap-y-8 w-10/12 lg:w-96 items-center lg:items-start mx-auto text-center lg:text-start">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
                Our Services
              </h1>
              <p className="text-dark font-lg">
                Empowering Individuals with Autism: Discover Our Comprehensive
                Lifestyle Services and Packages!
              </p>
            </div>
          </div>
          <div className="basis-full lg:basis-7/12 flex flex-col gap-y-12 items-center lg:items-start">
            {packages.map((service) => (
              <Service
                key={service.service}
                service={service}
                background="light"
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
