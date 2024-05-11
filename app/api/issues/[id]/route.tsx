import { createIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  return NextResponse.json(issue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({});
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } // - if doesn't exist return 404

  // - update the issue
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
  // - return the updated issue
}

