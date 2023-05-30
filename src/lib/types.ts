// custom types

enum ActionTypeKind {
  added = "added",
  changed = "changed",
  deleted = "deleted",
}

export type ActionType = {
  type: ActionTypeKind;
  payload: {
    id?: number;
    item: CartItemType;
    done?: Boolean;
  };
};

export type BenefitType = {
  title: string;
  description: string;
};

export type CartItemType = {
  id: number;
  item: {
    title: string;
    slug: string;
  };
  quantity: number;
  price: number;
  subTotal: number;
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

export type AddressType = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  city: string;
};

export interface AddressInfoProps {
  address: AddressType;
}

export interface CartItemExcerptProps {
  cartItem: CartItemType;
}

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

export interface CartState {
  cart: {
    items: CartItemType[];
    cartTotal: number;
  };
}
