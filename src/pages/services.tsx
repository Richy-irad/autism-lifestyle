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
        <div className="lg:container lg:mx-auto">
          <div className="flex gap-x-32 items-start lg:px-20 py-20">
            <div className="basis-1/2">
              <div className="flex flex-col gap-y-8 w-96">
                <h1 className="text-6xl font-bold">Our Services</h1>
                <p className="text-dark font-lg">
                  Empowering Individuals with Autism: Discover Our Comprehensive
                  Lifestyle Services and Packages!
                </p>
              </div>
            </div>
            <div className="basis-1/2 flex flex-col gap-y-12">
              {packages.map((service) => (
                <Service
                  key={service.service}
                  service={service}
                  background="light"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
