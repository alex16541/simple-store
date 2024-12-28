import { NextRequest, NextResponse } from "next/server";
import {
  getRouteCheckoutPage,
  getRouteLoginPage,
  getRouteManagerOrdersPage,
  getRouteOrderPage,
  getRouteOrdersPage,
} from "./shared/router/routes";
import { getSession } from "./lib/server/session";

// reqire auth to all routes and its subroutes
const routeRules = [
  { path: getRouteOrdersPage(), authOnly: true },
  { path: getRouteOrderPage(""), authOnly: true },
  { path: getRouteCheckoutPage(), authOnly: true },
  {
    path: getRouteManagerOrdersPage(),
    authOnly: true,
    roles: ["manager", "admin"],
  },
];

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const route = routeRules.find((i) => pathname.startsWith(i.path));
  if (!route) return NextResponse.next();

  const isRequireAuth = route.authOnly;

  if (isRequireAuth) {
    const user = await getSession();

    const redirectToLogin = () =>
      NextResponse.redirect(
        new URL(getRouteLoginPage(pathname), request.nextUrl),
      );

    const redirectToMain = () =>
      NextResponse.redirect(
        new URL('/', request.nextUrl),
      );
    
    if (!user) return redirectToLogin();

    const roleIndex = route.roles?.indexOf(user.role);

    if (roleIndex === -1) return redirectToMain();
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|les.jpeg).*)",
  ],
};

export default middleware;
