import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contactForm";

const Contact = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Get in touch for personalized autism education solutions. Our team is here to answer your questions and guide you through our specialized programs. Reach out now to join our community and embark on a journey of growth and learning."
        />
        <meta
          name="keywords"
          content="Autism lifestyle, Autism support, Autism resources, Autism strategies, Autism communication,  Autism social skills, Autism well-being, Autism community, Autism empowerment, Autism families, Autism insights, Autism experts, Autism inclusive, Autism therapy, Autism learning resources, Autism parenting tips, Autism education, Autism awareness, Autism acceptance, Autism advocacy"
        />
        <title>Contact Us | Autism Lifestyle</title>
        <meta property="og:title" content="Contact Us | Autism Lifestyle" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <main className="font-josefin-sans">
        <div className="bg-white">
          <div className="px-5 lg:mx-40 py-20 flex flex-col gap-y-8">
            <h1 className="text-center lg:text-end text-3xl md:text-4xl lg:text-6xl font-bold">
              Get in Touch
            </h1>
            <div className="flex justify-between flex-wrap gap-y-4">
              <div className="basis-full lg:basis-7/12">
                <ContactForm />
              </div>
              <div className="basis-full gap-x-10 gap-y-10 px-7 py-8 items-center justify-center flex flex-col md:flex-row lg:flex-col md:items-start md:justify-start lg:basis-4/12">
                <div className="flex flex-col gap-y-3 items-start lg:items-end text-start lg:text-end w-full">
                  <p className="font-semibold text-3xl">Phone</p>
                  <p className="font-regular text-2xl">+254737965972</p>
                </div>
                <div className="flex flex-col gap-y-3 items-start lg:items-end text-start lg:text-end w-full">
                  <p className="font-semibold text-3xl">E-mail</p>
                  <Link
                    href="mailto:brendaeringo@gmail.com"
                    className="font-regular text-2xl hover:text-primary"
                  >
                    brendaeringo@gmail.com
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

export default Contact;
