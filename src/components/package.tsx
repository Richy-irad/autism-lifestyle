import React, { FC, useContext } from "react";
import Link from "next/link";
import { CartActions, ServiceProps, PackageType } from "@/lib/types";
import { CartDispatchContext } from "@/lib/contexts/CartContext";
import { Basket } from "@phosphor-icons/react";

let nextId = 0;

const Service: FC<ServiceProps> = ({ service, background }): JSX.Element => {
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
    <div
      className={`${
        background === "white" ? "bg-white" : "bg-concrete"
      } px-7 py-8 rounded-md flex flex-col gap-y-12`}
    >
      <div className="flex justify-between items-center">
        <h3 className="basis-9/12 text-dark text-xl lg:text-3xl font-medium">
          {service.service}
        </h3>
        <Link
          href={`/services/${service.slug}`}
          className="basis-3/12 text-blue text-lg font-bold underline underline-offset-4"
        >
          View details
        </Link>
      </div>
      <div className="flex flex-col gap-y-8">
        <p className="text-base text-dark text-start lg:text-justify lg:text-lg">
          {service.description}
        </p>
        <div className="flex flex-col gap-y-6">
          <h4 className="text-lg lg:text-2xl text-black font-regular">
            Benefits
          </h4>
          <div className="flex gap-4 flex-wrap">
            {service.benefits.map((benefit, index) => (
              <span
                key={index}
                className="bg-secondary text-white text-sm font-semibold text-center p-2.5 rounded-md"
              >
                {benefit.title}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl">
            $ {service.price.toLocaleString("en-US")}.
          </span>
          <button
            type="button"
            className="text-primary text-sm font-semibold mx-2 my-2.5"
            onClick={() => handleAddToCart(service, 1)}
          >
            <Basket size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
