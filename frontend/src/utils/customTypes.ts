type ProductType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

type UserType = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
};

type OrderType = {
  _id?: string;
  user: string;
  orderedItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    productId: string;
  }[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  //Total items price before tax
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
};

type ShippingAddressType = {
  address: string;
  city: string;
  postalCode: number;
  country: string;
};

export type { ProductType, UserType, OrderType, ShippingAddressType };
