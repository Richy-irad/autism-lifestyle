import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import heroImage from "../../public/assets/cdc-20YP7NENJzk-unsplash.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* hero section */}
        <div className="bg-white">
          <div className="lg:container lg:mx-auto">
            <div className="flex gap-x-16 items-center lg:px-20 h-[698px] pt-16 pb-32">
              <div className="basis-1/2 flex flex-col gap-y-11 items-start">
                <div className="flex flex-col gap-y-5">
                  <h1 className="text-6xl font-bold">Education is Power</h1>
                  <p className="text-lg font-regular">
                    We are in an era where cases of autism are increasing by
                    day. Here, sensitization and inclusivity is key. We are here
                    to make that happen. Let's grow and learn together
                  </p>
                </div>
                <Link
                  href="/services"
                  className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
                >
                  Browse our Services
                </Link>
              </div>
              <div className="basis-1/2 h-full">
                <Image
                  src={heroImage}
                  priority
                  alt=""
                  className="w-full h-full object-cover object-top rounded-tl-[259px] rounded-tr-[98px] rounded-bl-[259px] rounded-br-[250px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* services section */}
        <div className="bg-concrete">
          <div className="lg:container lg:mx-auto">
            <div className="flex gap-x-32 items-start lg:px-20 py-20">
              <div className="basis-1/2">
                <div className="flex flex-col gap-y-8 w-96">
                  <h1 className="text-6xl font-bold">Our Services</h1>
                  <p className="text-dark font-lg">
                    Empowering Individuals with Autism: Discover Our
                    Comprehensive Lifestyle Services and Packages!
                  </p>
                </div>
              </div>
              <div className="basis-1/2"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
