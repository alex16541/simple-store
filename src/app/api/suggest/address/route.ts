import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query");

  if (!query === undefined)
    return Response.json(
      { error: "No query param. Query parameter is required" },
      { status: 400 },
    );
  const res = await fetch(
    `https://suggest-maps.yandex.ru/v1/suggest?apikey=e977bf59-e400-4fe4-aa77-da432130f7e0&text=${query}&types=house&attrs=uri`,
  ).then((d) => d.json());

  return Response.json(
    {
      data: res,
    },
    {
      status: 200,
    },
  );
};
