import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/assets/cdc-20YP7NENJzk-unsplash.jpg";
import { IndexProps } from "@/lib/types";
import { client } from "../../sanity/lib/client";

import ContactForm from "@/components/contactForm";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Service from "@/components/package";

export const getStaticProps = async () => {
  const query = `*[_type == 'service']{
    service, 
    "slug": slug.current, 
    metaDescription, 
    videoDescription, 
    description, 
    price,
    "benefits": *[_type == 'benefit' && references(^._id)]{title, description}
  }[0...3]`;
  const packages = await client.fetch(query);

  return {
    props: {
      packages,
    },
  };
};

const Home: FC<IndexProps> = ({ packages }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Empowering lives through specialized autism lifestyle education. Discover our comprehensive programs designed to enhance communication, social skills, and overall well-being for individuals and families affected by autism. Join our thriving community for personalized learning and empowering solutions."
        />
        <meta
          name="keywords"
          content="Autism lifestyle, Autism support, Autism resources, Autism strategies, Autism communication,  Autism social skills, Autism well-being, Autism community, Autism empowerment, Autism families, Autism insights, Autism experts, Autism inclusive, Autism therapy, Autism learning resources, Autism parenting tips, Autism education, Autism awareness, Autism acceptance, Autism advocacy"
        />
        <title>Autism Lifestyle</title>
        <meta property="og:title" content="Autism Lifestle" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <main className="font-inter">
        {/* hero section */}
        <div className="bg-hero-image bg-cover">
          <div className="flex gap-x-16 items-center pt-16 h-[400px]  lg:mx-40 lg:h-[698px] pb-16 lg:pb-32">
            <div className="basis-full lg:basis-1/2 flex flex-col gap-y-11 items-center lg:items-start px-5">
              <div className="flex flex-col gap-y-5 text-white">
                <h1 className="font-josefin-sans text-3xl md:text-4xl lg:text-6xl font-bold text-center lg:text-start">
                  Education is Power
                </h1>
                <p className="text-lg font-regular text-center lg:text-start">
                  We are in an era where cases of autism are increasing by day.
                  Here, sensitization and inclusivity is key. We are here to
                  make that happen. Let&lsquo;s grow and learn together
                </p>
              </div>
              <Link
                href="/services"
                className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
              >
                Browse our Services
              </Link>
            </div>
          </div>
        </div>

        {/* services section */}
        <div className="bg-concrete">
          <div className="flex gap-y-12 lg:gap-x-32 items-start px-5 lg:mx-40 py-20 flex-wrap lg:flex-nowrap">
            <div className="basis-full lg:basis-5/12">
              <div className="flex flex-col gap-y-3 lg:gap-y-8 w-10/12 lg:w-96 items-center lg:items-start mx-auto text-center lg:text-start">
                <h1 className="font-josefin-sans text-3xl md:text-4xl lg:text-6xl font-bold">
                  Our Services
                </h1>
                <p className="text-dark text-lg">
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
                  background="white"
                />
              ))}
              <Link
                href="/services"
                className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
              >
                View all Services
              </Link>
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="bg-white">
          <div className="px-5 lg:mx-40 py-20 flex flex-col gap-y-8">
            <h1 className="font-josefin-sans text-center lg:text-start text-3xl md:text-4xl lg:text-6xl font-bold">
              Get in Touch
            </h1>
            <div className="flex justify-between flex-wrap gap-y-4">
              <div className="basis-full lg:basis-7/12">
                <ContactForm />
              </div>
              <div className="basis-full gap-x-10 gap-y-10 px-7 py-8 items-center justify-center flex flex-col md:flex-row lg:flex-col md:items-start md:justify-start lg:basis-4/12">
                <div className="flex flex-col gap-y-3 items-start lg:items-end text-start lg:text-end w-full">
                  <p className="font-semibold text-3xl">Phone</p>
                  <p className="font-regular text-2xl">
                    +254&nbsp;724&nbsp;235049
                  </p>
                </div>
                <div className="flex flex-col gap-y-3 items-start lg:items-end text-start lg:text-end w-full">
                  <p className="font-semibold text-3xl">E-mail</p>
                  <Link
                    href="mailto:info@autismlifestyle.org"
                    className="font-regular text-2xl hover:text-primary"
                  >
                    info@autismlifestyle.org
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
