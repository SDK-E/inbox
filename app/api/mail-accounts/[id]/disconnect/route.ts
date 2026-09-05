import { disconnectMailAccount } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  await disconnectMailAccount(params.id);
  return new Response(null, { status: 204 });
}
