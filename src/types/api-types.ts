import {
  Bar,
  CartItem,
  Line,
  Order,
  Product,
  ShippingInfo,
  User,
} from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type UserResponse = {
  success: boolean;
  user: User;
};
export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};
export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};
export type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};
export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};
export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};
export type AllUsersResponse = {
  success: boolean;
  users: User[];
};
export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};
export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};
export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};
type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};
type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};
export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};
