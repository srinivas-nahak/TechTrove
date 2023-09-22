import { ProductType } from "../productType";

export async function loadProducts() {
  try {
    const response = await fetch("http://localhost:4000/api/products");

    if (!response.ok) {
      throw new Error("Something went wrong!");
      return;
    }
    const data = (await response.json()) as ProductType[];

    return data;
  } catch (error) {
    const e = error as Error;
    throw new Error(e.message);
  }
}

export async function loadProduct(id: number) {
  try {
    const response = await fetch(`http://localhost:4000/api/products/${id}`);

    if (!response.ok) {
      throw new Error("Product not found!");
    }

    const data = (await response.json()) as ProductType;

    return data;
  } catch (error) {
    return error;
  }
}
