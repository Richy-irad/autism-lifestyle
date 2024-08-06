import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";

const Blog = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="font-inter">
        <div className="bg-white">
          <div className="px-5 lg:mx-40 py-10 lg:py-20 flex flex-col gap-y-8">
            <h1 className="text-center lg:text-start text-3xl md:text-4xl lg:text-6xl font-bold">
              Blog
            </h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
