import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Success = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <Navbar />
      <main className="font-josefin-sans">
        <h1>Make Payments</h1>
      </main>
      <Footer />
    </>
  );
};

export default Success;
