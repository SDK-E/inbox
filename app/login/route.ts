import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.redirect(await getSignInUrl());
};
