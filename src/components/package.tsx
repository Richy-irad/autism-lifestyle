import React, { FC } from "react";
import Link from "next/link";
import { ServiceProps } from "@/lib/types";

const Service: FC<ServiceProps> = ({ service, background }): JSX.Element => {
  return (
    <div
      key={service.service}
      className={`${
        background === "white" ? "bg-white" : "bg-concrete"
      } px-7 py-8 rounded-md flex flex-col gap-y-12`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-dark text-3xl font-medium">{service.service}</h3>
        <Link
          href="#"
          className="text-blue text-lg font-bold underline underline-offset-4"
        >
          View Package
        </Link>
      </div>
      <div className="flex flex-col gap-y-8">
        <p className="text-lg text-dark text-justify">{service.description}</p>
        <div className="flex flex-col gap-y-6">
          <h4 className="text-2xl text-black font-regular">Benefits</h4>
          <div className="flex gap-4 flex-wrap">
            {service.benefits.map((benefit) => (
              <span className="bg-secondary text-white text-sm font-semibold text-center p-2.5 rounded-md">
                {benefit.title}
              </span>
            ))}
          </div>
        </div>
        <span className="font-bold text-2xl">
          KES. {service.price.toLocaleString("en-US")}.
        </span>
      </div>
    </div>
  );
};

export default Service;
