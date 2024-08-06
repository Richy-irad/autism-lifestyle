import React, { FC } from "react";
import Link from "next/link";
import { ServiceProps } from "@/lib/types";

const Service: FC<ServiceProps> = ({ service, background }): JSX.Element => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`${
        background === "white" ? "bg-white" : "bg-concrete"
      } px-7 py-8 rounded-md flex flex-col gap-y-12`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-josefin-sans basis-9/12 text-dark text-xl lg:text-3xl font-medium">
          {service.service}
        </h3>
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
            $ {service.price && service.price.toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Service;
