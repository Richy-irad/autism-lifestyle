import React, { FC } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPackagesSlugs, getPackage } from "@/lib/packages";
import { ServiceProps } from "@/lib/types";
import { ParsedUrlQuery } from "querystring";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

// getStaticPaths
export const getStaticPaths = async () => {
  const paths = getAllPackagesSlugs();

  return {
    paths,
    fallback: false,
  };
};

// getStaticProps
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const service = getPackage(slug);
  return {
    props: {
      service,
    },
  };
};

const Service: FC<ServiceProps> = ({ service }): JSX.Element => {
  return (
    <>
      <Navbar />

      <main className="font-josefin-sans">
        {/* services section */}
          <div className="flex flex-col flex-wrap gap-y-8 gap-x-32 items-start px-5 py:10 lg:py-20 lg:mx-40 lg:flex-row lg:flex-nowrap">
            <div className="basis-full lg:basis-6/12 order-3 lg:order-none">
              <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl hidden md:text-4xl lg:text-5xl font-bold lg:flex">{service.service}</h1>
                <p className="text-dark text-justify font-lg">
                  {service.description}
                </p>
                <div className="flex flex-col gap-y-6">
                  <h4 className="text-2xl text-black font-regular">Benefits</h4>
                  <div className="flex flex-col gap-3 flex-wrap">
                    {service.benefits.map((benefit) => (
                      <p key={benefit.title}>
                        <span className="font-bold text-secondary">
                          {benefit.title}:{" "}
                        </span>
                        {benefit.description}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl mt-3 md:text-4xl lg:text-5xl font-bold flex order-1 lg:order-none lg:hidden">{service.service}</h1>

            <div className="basis-full order-2 flex flex-col gap-y-12 bg-concrete rounded-3xl px-4 py-4 lg:py-8 lg:order-none lg:basis-5/12">
              <video className="w-full h-auto max-w-full rounded-3xl" controls>
                <source
                  src={service.videoDescription}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <span className="font-bold text-2xl">
                KES. {service.price.toLocaleString("en-US")}.
              </span>
              <div className="flex flex-col gap-2 text-center">
                <Link
                  href="/services"
                  className="text-primary font-semibold px-4 py-5 border-2 border-primary rounded-md"
                >
                  Add Package to Cart
                </Link>

                <Link
                  href="/services"
                  className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
                >
                  Browse our Services
                </Link>
              </div>
            </div>
          </div>
      </main>

      <Footer />
    </>
  );
};

export default Service;
