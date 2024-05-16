import authOptions from "@/app/auth/authOptions";
import { pathIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";

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
  //securing api end point

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({});
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //securing api end point
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = pathIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // this is the part for validating assigned to user id
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue now found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}
