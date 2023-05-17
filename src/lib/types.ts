// custom types

export type BenefitType = {
  title: string;
  description: string;
};

export type PackageType = {
  service: string;
  slug: string;
  videoDescription: string;
  description: string;
  benefits: BenefitType[];
  price: number;
};

export type MessageType = {
  title: string;
  description: string;
};

export interface ServiceProps {
  service: PackageType;
  background?: string;
}

export interface IndexProps {
  packages: PackageType[];
}

export interface ServicesProps {
  packages: PackageType[];
}
