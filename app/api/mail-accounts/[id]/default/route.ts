import { setDefaultMailAccount } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  await setDefaultMailAccount(params.id);
  return new Response(null, { status: 204 });
}
