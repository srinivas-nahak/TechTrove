import { ProductType } from "./customTypes";
import { BASE_URL, PRODUCTS_URL } from "./constants";

export async function loadProducts() {
  try {
    const response = await fetch(`${BASE_URL}${PRODUCTS_URL}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = (await response.json()) as ProductType[];

    return data;
  } catch (error) {
    const e = error as Error;
    throw new Error(e.message);
  }
}

export async function loadProduct(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${PRODUCTS_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Product not found!");
    }

    const data = (await response.json()) as ProductType;

    return data;
  } catch (error) {
    return error;
  }
}
