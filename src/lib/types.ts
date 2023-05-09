// custom types

export type BenefitType = {
  title: string;
  description: string;
};

export type PackageType = {
  service: string;
  description: string;
  benefits: BenefitType[];
  price: number;
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
