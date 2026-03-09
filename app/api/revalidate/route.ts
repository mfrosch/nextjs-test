import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  const expectedSecret = process.env.REVALIDATE_SECRET || "test123";

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { revalidated: false, error: "Missing path parameter" },
      { status: 400 }
    );
  }

  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  });
}
