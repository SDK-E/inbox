import { connectMailAccount } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const result = await connectMailAccount(await request.json());
  return Response.json(result);
}
