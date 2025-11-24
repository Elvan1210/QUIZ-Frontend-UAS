import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNumber = Number(id);

    const existing = await prisma.gadget.findUnique({
      where: { id: idNumber }
    });

    if (!existing) {
      return NextResponse.json({ error: "Item tidak ditemukan" }, { status: 404 });
    }

    await prisma.gadget.delete({
      where: { id: idNumber },
    });

    return NextResponse.json({ message: "Berhasil dihapus" });

  } catch (error) {
    console.error("Error saat menghapus:", error);
    return NextResponse.json({ error: "Gagal menghapus data di server" }, { status: 500 });
  }
}

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await prisma.gadget.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(item);
}