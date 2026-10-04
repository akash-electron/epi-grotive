export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // TODO: wire to email provider / CRM. For now, log and acknowledge.
    console.log("Contact submission:", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim().slice(0, 2000),
    });

    // Simulate latency so the UI sending state is visible
    await new Promise((r) => setTimeout(r, 800));

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
