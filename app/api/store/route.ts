import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name } = body;
    if (!userId) return new NextResponse("UnAuthorized"), { status: 401 };
    if (!name) return new NextResponse("Name required", { status: 400 });

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    revalidatePath("/admin");
    return NextResponse.json(store);
  } catch (error) {
    console.log("[api/store]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    if (stores.length === 0)
      return NextResponse.json({ error: "Stores Not Found" });

    return NextResponse.json(stores);
  } catch (error) {
    console.log("[api/store - get]", error);
  }
}
