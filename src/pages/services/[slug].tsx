import React, { FC, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { CartActions, PackageType, ServiceProps } from "@/lib/types";
import { ParsedUrlQuery } from "querystring";
import Navbar from "@/components/navbar";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

import { CartDispatchContext } from "@/lib/contexts/CartContext";
import { client } from "../../../sanity/lib/client";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

// getStaticPaths
export const getStaticPaths = async () => {
  const query = `*[_type == 'service'].slug.current`;
  const slugs = await client.fetch(query);
  const paths = slugs.map((slug: string) => {
    return {
      params: {
        slug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// getStaticProps
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const query = `*[_type == 'service' && slug.current == $slug]{
    service, 
    "slug": slug.current, 
    metaDescription, 
    videoDescription, 
    description, 
    price, 
    "benefits": *[_type == 'benefit' && references(^._id)]{title, description}
  }`;
  const params = {
    slug: slug,
  };
  const serviceResponse = await client.fetch(query, params);
  const service = await serviceResponse.reduce((serv: PackageType) => serv);

  return {
    props: {
      service,
    },
  };
};

let nextId = 0;

const Service: FC<ServiceProps> = ({ service }): JSX.Element => {
  const dispatch = useContext(CartDispatchContext);

  const handleAddToCart = (service: PackageType, quantity: number) => {
    let subTotal = service.price * quantity;
    dispatch?.({
      type: CartActions.added,
      payload: {
        item: {
          id: nextId++,
          item: {
            title: service.service,
            slug: service.slug,
          },
          quantity: quantity,
          price: service.price,
          subTotal: subTotal,
        },
      },
    });
  };
  return (
    <>
      <Head>
        <meta name="description" content={service.metaDescription} />
        <meta
          name="keywords"
          content="Autism lifestyle, Autism support, Autism resources, Autism strategies, Autism communication,  Autism social skills, Autism well-being, Autism community, Autism empowerment, Autism families, Autism insights, Autism experts, Autism inclusive, Autism therapy, Autism learning resources, Autism parenting tips, Autism education, Autism awareness, Autism acceptance, Autism advocacy"
        />
        <title>{service.service}</title>
        <meta property="og:title" content={service.service} />
        <meta property="og:type" content="website" />
      </Head>
      <Topbar />
      <Navbar />

      <main className="font-inter">
        {/* services section */}
        <div className="flex flex-col flex-wrap gap-y-8 gap-x-32 items-start px-5 py:10 lg:py-20 lg:mx-40 lg:flex-row lg:flex-nowrap">
          <div className="basis-full lg:basis-6/12 order-3 lg:order-none">
            <div className="flex flex-col gap-y-8">
              <h1 className="font-josefin-sans text-3xl hidden md:text-4xl lg:text-5xl font-bold lg:flex">
                {service.service}
              </h1>
              <p className="text-dark text-justify font-lg">
                {service.description}
              </p>
              <div className="flex flex-col gap-y-6">
                <h4 className="text-2xl text-black font-regular">Benefits</h4>
                <div className="flex flex-col gap-3 flex-wrap">
                  {service.benefits.map((benefit, index) => (
                    <p key={index}>
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

          <h1 className="text-3xl mt-3 md:text-4xl lg:text-5xl font-bold flex order-1 lg:order-none lg:hidden">
            {service.service}
          </h1>

          <div className="basis-full order-2 flex flex-col gap-y-12 bg-concrete rounded-3xl px-4 py-4 lg:py-8 lg:order-none lg:basis-5/12">
            <video className="w-full h-auto max-w-full rounded-3xl" controls>
              <source src={service.videoDescription} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <span className="font-bold text-2xl">
              $ {service.price && service.price.toLocaleString("en-US")}
            </span>
            <div className="flex flex-col gap-2 text-center">
              <button
                type="button"
                className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
                onClick={() => handleAddToCart(service, 1)}
              >
                Add Package to Cart
              </button>

              <Link
                href="/services"
                className="text-primary font-semibold px-4 py-5 border-2 border-primary rounded-md"
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
