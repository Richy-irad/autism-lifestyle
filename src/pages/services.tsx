import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
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
            <div className="basis-1/2"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
