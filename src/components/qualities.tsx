"use client";

import {
  QuestionMark,
  Sliders,
  TrendUp,
  UserCheck,
  UsersFour,
  UsersThree,
} from "@phosphor-icons/react";

const qualities = [
  {
    name: "Customized Autism Services",
    description:
      "Our programs are designed to cater to the specific needs of each child, ensuring personalized care that fosters growth and development.",
    icon: <Sliders size={32} weight="bold" />,
  },
  {
    name: "Experienced Autism Specialists",
    description:
      "With years of expertise in autism care, our professionals provide knowledgeable and compassionate support for your child&aposs unique challenges.",
    icon: <UserCheck size={32} weight="bold" />,
  },
  {
    name: "Proven Track Record",
    description:
      "Our structured methods have a strong track record of helping children improve communication, social skills, and overall quality of life.",
    icon: <TrendUp size={32} weight="bold" />,
  },
  {
    name: "Inclusive Environment",
    description:
      "We create a safe and supportive space where children with autism feel understood and valued, promoting positive interactions and progress.",
    icon: <UsersFour size={32} weight="bold" />,
  },
  {
    name: "Comprehensive Autism Support",
    description:
      "From daily living skills to behavior management, our wide range of services addresses all aspects of your child&apos;s development.",
    icon: <QuestionMark size={32} weight="bold" />,
  },
  {
    name: "Empowering Families",
    description:
      "We equip families with the guidance and tools they need to confidently support their child&apos;s journey through autism.",
    icon: <UsersThree size={32} weight="bold" />,
  },
];

export default function Qualities() {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {qualities.map((quality, index) => (
        <div
          key={index}
          className="basis-1/4 grow px-7 py-6 rounded-lg flex flex-col gap-y-4 transition duration-700 ease-in-out hover:scale-110 hover:bg-secondary/15"
        >
          <div className="flex items-start gap-4">
            {quality.icon}
            <span className="text-light-200 capitalize font-bold text-[20px]">
              {quality.name}
            </span>
          </div>
          <p className="text-light-300">{quality.description}</p>
        </div>
      ))}
    </div>
  );
}
