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
        <div className="lg:container lg:mx-auto">
          <div className="flex gap-x-32 items-start lg:px-20 py-20">
            <div className="basis-6/12">
              <div className="flex flex-col gap-y-8">
                <h1 className="text-5xl font-bold">{service.service}</h1>
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
            <div className="basis-5/12 flex flex-col gap-y-12 bg-concrete rounded-3xl px-4 py-8">
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
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Service;
