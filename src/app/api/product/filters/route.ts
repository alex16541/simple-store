import { sql } from "@/lib/server/db";
import { cache } from "react";

const fetchCtaegories = cache(async () => {
  const data =
    await sql`SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category ASC`;
  return data;
});

const fetchBrands = cache(async () => {
  const data =
    await sql`SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL ORDER BY brand ASC`;
  return data;
});

const fetchPriceRange = cache(async () => {
  const data = await sql`SELECT MIN(price), MAX(price) FROM products`;
  return data;
});

export const GET = async () => {
  const [categories, brands, priceRange] = await Promise.all([
    fetchCtaegories(),
    fetchBrands(),
    fetchPriceRange(),
  ]);

  return Response.json(
    {
      categories,
      brands,
      priceRange,
    },
    {
      status: 200,
    },
  );
};
