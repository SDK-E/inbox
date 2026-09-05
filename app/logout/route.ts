import { signOut } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  await signOut();
  return NextResponse.redirect(new URL("/"));
};
