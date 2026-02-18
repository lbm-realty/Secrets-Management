import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type !== "hi" && type !== "bye") {
    return NextResponse.json(
      { error: "Invalid type. Use 'hi' or 'bye'." },
      { status: 400 }
    );
  }

  const hiName = process.env.HI_NAME;
  const byeName = process.env.BYE_NAME;

  if (!hiName || !byeName) {
    return NextResponse.json(
      {
        error:
          "Secrets not found. Make sure HI_NAME and BYE_NAME are set via Infisical.",
      },
      { status: 500 }
    );
  }

  if (type === "hi") {
    return NextResponse.json({
      message: `Hey there, ${hiName}! 👋 Infisical just handed me your secret.`,
      secretKey: "HI_NAME",
    });
  }

  return NextResponse.json({
    message: `Goodbye, ${byeName}! 👋 See you on the other side.`,
    secretKey: "BYE_NAME",
  });
}
