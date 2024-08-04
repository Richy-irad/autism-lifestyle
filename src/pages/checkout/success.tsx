import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { DownloadSimple } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { OrderType, SuccessProps } from "@/lib/types";
import { client } from "../../../sanity/lib/client";

interface IParams extends ParsedUrlQuery {
  orderTrackingID: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { OrderTrackingId } = context.query as IParams;

  let order = null;

  // check if there is an order tracking id in url query.
  // if there isn't the user didn't go through checkout and should be notified.
  // if there's query sanity for the order based on the order tracking id

  if (OrderTrackingId) {
    // fetch the order from sanity using orderTrackingId from query

    try {
      const query = `*[_type == 'order' && orderTrackingID == $orderTrackingId]{
        orderTrackingID,
        orderDate,
        billingAddress,
        orderItems,
      }`;
      const params = {
        orderTrackingId: OrderTrackingId,
      };

      const orderResponse = await client.fetch(query, params);

      // reduce the orderResponse to get the order
      order = await orderResponse.reduce((ord: OrderType) => ord);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      order,
    },
  };
};

const Success: FC<SuccessProps> = ({ order }): JSX.Element => {
  const convertOrderDate = (dateString: string) => {
    let date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const calculateOrderTotal = () => {
    let total = 0;
    order.orderItems.forEach((item) => {
      total += item.subTotal;
    });

    return total.toLocaleString("en-US");
  };
  return (
    <>
      <Head>
        <title>Checkout Success | Autism Lifestyle</title>
      </Head>
      <Navbar />
      <main className="font-inter">
        <div className="px-5 lg:mx-40 py-20">
          <div className="flex justify-center">
            {order ? (
              <div className="basis-full lg:basis-10/12 flex flex-col gap-y-8">
                <div className="flex justify-between mt-5 items-center">
                  <h1 className="text-5xl font-medium font-josefin-sans">
                    Receipt
                  </h1>
                  <div className="flex gap-x-2">
                    <button
                      type="button"
                      className="bg-white border border-light text-dark text-center font-bold px-4 py-5 rounded-md hover:bg-primary hover:border-primary flex gap-2 items-center"
                    >
                      <DownloadSimple size={24} />
                      Download Receipt
                    </button>
                  </div>
                </div>

                <div className="bg-concrete rounded-3xl px-7 py-8 flex justify-between">
                  <div className="basis-1/3 flex flex-col justify-between">
                    <div className="flex flex-col gap-2 flex-grow">
                      <h6 className="text-base font-semibold text-dark">
                        Receipt No
                      </h6>
                      <p className="text-dark-lighter">#0001</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-grow">
                      <h6 className="text-base font-semibold text-dark">
                        Receipt Date
                      </h6>
                      <p className="text-dark-lighter">15.05.2023</p>
                    </div>
                  </div>
                  <div className="basis-1/3 flex flex-col justify-between">
                    <div className="flex flex-col gap-2 flex-grow">
                      <h6 className="text-base font-semibold text-dark">
                        Sold by
                      </h6>
                      <p className="text-dark-lighter">Autism Lifestyle</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-grow">
                      <h6 className="text-base font-semibold text-dark">
                        Order No
                      </h6>
                      <p className="text-dark-lighter"># 0001</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-grow">
                      <h6 className="text-base font-semibold text-dark">
                        Order Date
                      </h6>
                      <p className="text-dark-lighter">
                        {convertOrderDate(order.orderDate)}
                      </p>
                    </div>
                  </div>
                  <div className="basis-1/5">
                    <div className="flex flex-col gap-2">
                      <h6 className="text-base font-semibold text-dark">
                        Billing Address
                      </h6>
                      <div className="text-dark-lighter flex flex-col gap-1.5">
                        <p className="text-dark-lighter">
                          {order.billingAddress.firstName}{" "}
                          {order.billingAddress.lastName}
                        </p>
                        <p className="text-dark-lighter">
                          {order.billingAddress.addressLine1}
                        </p>
                        <p className="text-dark-lighter">
                          {order.billingAddress.email}
                        </p>
                        <p className="text-dark-lighter">
                          {order.billingAddress.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="w-full">
                  <thead className="uppercase">
                    <tr className="border-t-0.5 border-light text-black">
                      <th className="py-2 px-4 text-start">SL No.</th>
                      <th className="py-2 px-4 text-start">Package</th>
                      <th className="py-2 px-4 text-end">Price</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4 text-end">Sub total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {order.orderItems.map((item, index) => (
                        <tr key={index} className="border-t-0.5 border-light">
                          <td className="py-5 px-4">{index + 1}</td>
                          <td className="py-5 px-4">{item.title}</td>
                          <td className="py-5 px-4 text-end">
                            KES. {item.price.toLocaleString("en-US")}
                          </td>
                          <td className="py-5 px-4 justify-center flex gap-x-3 items-center">
                            {item.quantity}
                          </td>
                          <td className="py-5 px-4 text-end">
                            KES. {item.subTotal.toLocaleString("en-US")}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-y-0.5 border-light font-bold">
                        <td className="text-start py-6 px-4">Items total:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-end py-6 px-4">
                          KES {calculateOrderTotal()}
                        </td>
                      </tr>
                    </>
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <p>
                  You were not redirected here from checkout. Please{" "}
                  <Link
                    href="/services"
                    className="basis-3/12 text-primary text-lg font-bold"
                  >
                    browse our services
                  </Link>
                  , and shop first.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Success;
