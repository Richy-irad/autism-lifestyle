import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MapPin } from "@phosphor-icons/react";

import aboutImage from "../../public/brian-tromp-MxkYQ39KFmE-unsplash.jpg";

const About = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Committed to transforming lives through autism education. Learn about our mission, values, and dedicated team. Discover how our tailored programs empower children with autism to thrive in a nurturing and inclusive environment."
        />
        <meta
          name="keywords"
          content="Autism lifestyle, Autism support, Autism resources, Autism strategies, Autism communication,  Autism social skills, Autism well-being, Autism community, Autism empowerment, Autism families, Autism insights, Autism experts, Autism inclusive, Autism therapy, Autism learning resources, Autism parenting tips, Autism education, Autism awareness, Autism acceptance, Autism advocacy"
        />
        <title>About Us | Autism Lifestyle</title>
        <meta property="og:title" content="About Us | Autism Lifestyle" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <main className="font-josefin-sans">
        <div className="flex">
          <div className="basis-full mx-5 py-8 lg:py-16 lg:basis-8/12 lg:mx-auto flex flex-col">
            {/* The quote */}
            <div className="basis-full lg:basis-8/12 lg:mx-auto flex flex-col lg:flex-row gap-4 lg:gap-16 items-center py-8 px-7 bg-concrete rounded-3xl">
              <Image
                src={aboutImage}
                alt=""
                className="hidden lg:flex w-[371px] h-[371px] object-cover rounded-full"
              />
              <div className="flex flex-col gap-8">
                <p className="font-regular text-base lg:text-2xl">
                  &#34;I am committed to empowering autism journeys, where we
                  embrace possibilities and inspire growth. Join us in making a
                  difference and fostering a community of support and
                  empowerment.&#34;
                </p>
                <div className="flex gap-3 items-center">
                  <Image
                    src={aboutImage}
                    alt=""
                    className="flex lg:hidden w-[60px] h-[60px] object-cover rounded-full"
                  />
                  <p className="font-regular text-lg">
                    Brenda Kawira &#45;{" "}
                    <span className="text-primary capitalize">Autism </span>
                    <span className="text-monte capitalize">
                      Lifestyle
                    </span>{" "}
                    Educator
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-2xl lg:text-6xl font-bold text-dark py-4 lg:py-16">
              Resume
            </h2>

            {/* work experience */}
            <div className="flex flex-col lg:flex-row gap-8 lg:justify-between border-b-0.5 border-light py-4 lg:py-16">
              <div className="basis-full lg:basis-1/4 lg:shrink-0">
                <h3 className="text-xl lg:text-5xl font-bold capitalize">
                  work experience
                </h3>
              </div>
              <div className="basis-full lg:basis-2/4 flex-col">
                <div className="flex gap-4 lg:px-7 pb-4 lg:pb-8">
                  <p className="shrink-0 font-light w-[120px]">
                    2022 &#45; Present
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-lg lg:text-3xl font-bold capitalize">
                        Autism Teacher
                      </p>
                      <p className="text-base lg:text-2xl font-semibold">
                        Green Reed Academy
                      </p>
                    </div>
                    <p className="text-sm lg:text-lg font-medium">
                      Shadow teacher to two learners with autism and special
                      needs consultant.
                    </p>
                    <div className="flex gap-2.5">
                      <MapPin size={20} />
                      <p className="text-sm lg:text-lg font-normal">
                        Kanunga, Kiambu county.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="shrink-0 font-light w-[120px]">
                    2021 &#45; 2022
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-lg lg:text-3xl font-bold capitalize">
                        PP1 Teacher
                      </p>
                      <p className="text-base lg:text-2xl font-semibold">
                        Babies and beyond Kindergarten
                      </p>
                    </div>
                    <p className="text-sm lg:text-lg font-medium">
                      PP1 teacher and SNE consultant.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="shrink-0 font-light w-[120px]">
                    2019 &#45; 2021
                  </p>
                  <div className="flex flex-col gap-6">
                    <p className="text-lg lg:text-3xl font-bold capitalize">
                      Intern
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-base lg:text-2xl font-semibold">
                        Wire Special School for MH &#45; Oyugis, Homabay County
                      </p>
                      <p className="text-sm lg:text-xl font-medium">
                        Teacher for learners with autism.
                      </p>
                      <p className="text-xs lg:text-lg font-light">
                        26th July to 1st October 2021.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <p className="text-base lg:text-3xl font-semibold capitalize">
                        Sunshine Kindergarten and Daycare- Kimbo, Kiambu County
                      </p>
                      <p className=" text-sm lg:text-xl font-medium">
                        PP1 teacher
                      </p>
                      <p className="text-xs lg:text-lg font-light">
                        5th January to 28th March 2019.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* education */}
            <div className="flex flex-col lg:flex-row gap-8 lg:justify-between border-b-0.5 border-light py-4 lg:py-16">
              <div className="basis-full lg:basis-1/4 lg:shrink-0">
                <h3 className="text-xl lg:text-5xl font-bold capitalize">
                  Education
                </h3>
              </div>
              <div className="basis-full lg:basis-2/4 flex-col">
                <div className="flex gap-4 lg:px-7 pb-4 lg:pb-8">
                  <p className="shrink-0 font-light w-[120px]">
                    2019 &#45; 2021
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-lg lg:text-3xl font-bold capitalize">
                        Kenya Institute of Special Needs Education &#124;
                        Kasarani
                      </p>
                      <p className="text-base lg:text-2xl font-semibold">
                        Diploma in Special Needs Education &#40;Autism&#41;.
                      </p>
                    </div>
                    <p className="text-sm lg:text-lg font-medium">
                      September, 2019 to September, 2021.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="shrink-0 font-light w-[120px]">
                    2021 &#45; 2022
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-lg lg:text-3xl font-bold capitalize">
                        Havard Institute &#124; Thika
                      </p>
                      <p className="text-base lg:text-2xl font-semibold">
                        Certificate in Early Childhood Development and Education
                        &#40;ECDE&#41;.
                      </p>
                    </div>
                    <p className="text-sm lg:text-lg font-medium">
                      May, 2018 - April, 2019.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* skills and expertise */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:justify-between py-4 lg:py-16">
              <div className="basis-full lg:basis-1/4 lg:shrink-0">
                <h3 className="text-xl lg:text-5xl font-bold capitalize">
                  Skills &#38; Expertise
                </h3>
              </div>
              <div className="basis-full lg:basis-2/4 flex-col">
                <div className="flex flex-col gap-2 lg:gap-4 lg:px-7 pb-4 lg:pb-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    leadership skills
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    Besides being in charge of a class in Global Academy, I was
                    a volleyball captain for 2years in high school and headed
                    the liturgical dance in church for 4 years.
                  </p>
                </div>

                <div className="flex flex-col gap-2 lg:gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    Team Player
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    I am able to work as a competent member of the team
                    willingly providing back&#45;up support for other teachers
                    and staff members in the Organization and appropriately and
                    actively support the team to meet the overall organization
                    goals.
                  </p>
                </div>

                <div className="flex flex-col gap-2 lg:gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    Planning Skills
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    I have ability to plan different work activities and execute
                    then within the required time at school for the children and
                    also at church.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    Flexibility
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    I have the Capacity to fit into most environments, maintain
                    calm under pressure and can adapt well with children of
                    different age groups and different ability and help them
                    develop to reach higher levels.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    First Aid
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    I have the ability to conduct first aid in case of an
                    incident requiring minor medical attention in the absence of
                    a professional medical personnel.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:px-7 py-4 lg:py-8">
                  <p className="text-lg lg:text-2xl font-bold capitalize">
                    Digital media
                  </p>
                  <p className="text-base lg:text-lg font-light">
                    I am able to confidently operate any electrical device and
                    use it effectively for educational purposes to promote
                    digital literacy among learners.
                  </p>
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

export default About;
