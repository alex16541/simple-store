"use server";

import { sql } from "@/lib/server/db";
import { Product } from "@/entity/Product";

export async function createProductsTable() {
  const data = await sql`CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        stock INT NOT NULL
    )`;
  return data;
}

export async function getProducts(
  searchParams?: Record<string, string>,
): Promise<Product[]> {
  let data: Product[] = [];

  const fetchProducts = async () => {
    return (await sql`SELECT 
              p.*, 
              COALESCE(
                ARRAY_AGG(pi.url) 
                FILTER (WHERE pi.url IS NOT NULL), 
                ARRAY[]::VARCHAR[]
              ) AS images 
              FROM products p 
              LEFT JOIN product_images pi 
              ON p.id = pi.product_id
              GROUP BY p.id`) as Product[];
  };

  const fetchProductsWithParams = async (params: string[]) => {
    return (await sql(
      `SELECT 
          p.*, 
          COALESCE(
            ARRAY_AGG(pi.url) 
            FILTER (WHERE pi.url IS NOT NULL), 
            ARRAY[]::VARCHAR[]
          ) AS images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE ${params.join(" AND ")}
        GROUP BY p.id`,
    )) as Product[];
  };

  if (searchParams) {
    const params = [];
    if (searchParams.search)
      params.push(
        `(name ILIKE '%${searchParams.search}%' OR description ILIKE '%${searchParams.search}%')`,
      );
    if (searchParams.category)
      params.push(`category = '${searchParams.category}'`);
    if (searchParams.brand) params.push(`brand = '${searchParams.brand}'`);
    if (searchParams.minPrice) params.push(`price >= ${searchParams.minPrice}`);
    if (searchParams.maxPrice) params.push(`price <= ${searchParams.maxPrice}`);
    if (searchParams.minRate) params.push(`rate >= ${searchParams.minRate}`);
    if (searchParams.maxRate) params.push(`rate <= ${searchParams.maxRate}`);
    if (searchParams.minStock) params.push(`stock >= ${searchParams.minStock}`);
    if (searchParams.maxStock) params.push(`stock <= ${searchParams.maxStock}`);

    if (params.length > 0) {
      data = await fetchProductsWithParams(params);
    } else {
      data = await fetchProducts();
    }
  } else {
    data = await fetchProducts();
  }

  return data;
}

export async function deleteProduct(id: number) {
  const data = await sql`DELETE FROM products WHERE id = ${id}`;
  return data;
}

export async function getProductByIds(ids: number[]): Promise<Product[]> {
  const data = await sql`SELECT * FROM products WHERE id = ANY(${ids})`;
  return data as Product[];
}

export async function createProduct(product: Product) {
  const data =
    await sql`INSERT INTO products (name, price, description, category, brand, stock) VALUES 
    (${product.name}, ${product.price}, ${product.description}, ${product.category}, ${product.brand}, ${product.stock})`;
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const data =
    await sql`SELECT p.*, COALESCE(ARRAY_AGG(pi.url) FILTER (WHERE pi.url IS NOT NULL), ARRAY[]::VARCHAR[]) AS images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = ${id}
      GROUP BY p.id`;

  return data[0] as Product;
}

export async function getProductsByCategory(category: string) {
  const data = await sql`SELECT * FROM products WHERE category = ${category}`;
  return data;
}

export async function getProductsByBrand(brand: string) {
  const data = await sql`SELECT * FROM products WHERE brand = ${brand}`;
  return data;
}

export async function getProductsByCategoryAndBrand(
  category: string,
  brand: string,
) {
  const data =
    await sql`SELECT * FROM products WHERE category = ${category} AND brand = ${brand}`;
  return data;
}

export async function getCategories(): Promise<{ category: string }[]> {
  const data =
    await sql`SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category ASC`;
  return data as { category: string }[];
}

export async function getBrands(): Promise<{ brand: string }[]> {
  const data =
    await sql`SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL ORDER BY brand ASC`;
  return data as { brand: string }[];
}

export async function getProductsBySearch(search: string) {
  const data = await sql`SELECT * FROM products WHERE name ILIKE ${search}`;
  return data;
}

export async function getProductsByCategoryAndSearch(
  category: string,
  search: string,
) {
  const data =
    await sql`SELECT * FROM products WHERE category = ${category} AND name ILIKE ${search}`;
  return data;
}

export async function getProductsByBrandAndSearch(
  brand: string,
  search: string,
) {
  const data =
    await sql`SELECT * FROM products WHERE brand = ${brand} AND name ILIKE ${search}`;
  return data;
}

export async function getProductsByCategoryAndBrandAndSearch(
  category: string,
  brand: string,
  search: string,
) {
  const data =
    await sql`SELECT * FROM products WHERE category = ${category} AND brand = ${brand} AND name ILIKE ${search}`;
  return data;
}

export async function getProductsByCategoryAndSearchWithPagination(
  category: string,
  search: string,
  limit: number,
  offset: number,
) {
  const data =
    await sql`SELECT * FROM products WHERE category = ${category} AND name ILIKE ${search} LIMIT ${limit} OFFSET ${offset}`;
  return data;
}

export async function getProductsByBrandAndSearchWithPagination(
  brand: string,
  search: string,
  limit: number,
  offset: number,
) {
  const data =
    await sql`SELECT * FROM products WHERE brand = ${brand} AND name ILIKE ${search} LIMIT ${limit} OFFSET ${offset}`;
  return data;
}

export async function getProductsByCategoryAndBrandAndSearchWithPagination(
  category: string,
  brand: string,
  search: string,
  limit: number,
  offset: number,
) {
  const data =
    await sql`SELECT * FROM products WHERE category = ${category} AND brand = ${brand} AND name ILIKE ${search} LIMIT ${limit} OFFSET ${offset}`;
  return data;
}

export async function getProductsBySearchWithPagination(
  search: string,
  limit: number,
  offset: number,
) {
  const data =
    await sql`SELECT * FROM products WHERE name ILIKE ${search} LIMIT ${limit} OFFSET ${offset}`;
  return data;
}

export async function getPriceRange(): Promise<{ min: number; max: number }[]> {
  const data = await sql`SELECT MIN(price), MAX(price) FROM products`;
  return data as { min: number; max: number }[];
}

export async function getRateRange(): Promise<{ min: number; max: number }[]> {
  const data = await sql`SELECT MIN(rate), MAX(rate) FROM products`;
  return data as { min: number; max: number }[];
}

export async function getProductsByRate(
  min: number,
  max: number,
): Promise<Product[]> {
  const data =
    await sql`SELECT * FROM products WHERE rate >= ${min} AND rate <= ${max}`;
  return data[1] as Product[];
}
