export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  description: string;
  category: {
    name: string;
  };
}