import React, { FC } from "react";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ServicesProps } from "@/lib/types";

import Service from "@/components/package";
import { client } from "../../../sanity/lib/client";

export async function getStaticProps() {
  const query = `*[_type == 'service']{
    service, 
    "slug": slug.current, 
    metaDescription, 
    videoDescription, 
    description, 
    price, 
    "benefits": *[_type == 'benefit' && references(^._id)]{title, description}
  }`;

  const packages = await client.fetch(query);

  return {
    props: {
      packages,
    },
  };
}

const Services: FC<ServicesProps> = ({ packages }): JSX.Element => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Comprehensive autism education services for children. Explore our expertly crafted programs that foster communication, social skills, and overall development. Join us and experience the power of personalized learning in an inclusive and supportive environment."
        />
        <meta
          name="keywords"
          content="Autism lifestyle, Autism support, Autism resources, Autism strategies, Autism communication,  Autism social skills, Autism well-being, Autism community, Autism empowerment, Autism families, Autism insights, Autism experts, Autism inclusive, Autism therapy, Autism learning resources, Autism parenting tips, Autism education, Autism awareness, Autism acceptance, Autism advocacy"
        />
        <title>Services | Autism Lifestyle</title>
        <meta property="og:title" content="Services | Autism Lifestyle" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <main className="font-josefin-sans">
        {/* services section */}
        <div className="flex gap-y-12 lg:gap-x-32 items-start px-5 lg:mx-40 py-10 lg:py-20 flex-wrap lg:flex-nowrap">
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
