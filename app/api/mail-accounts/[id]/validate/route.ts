import { validateMailAccount } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const result = await validateMailAccount(params.id);
  return Response.json(result);
}
