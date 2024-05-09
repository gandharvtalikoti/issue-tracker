import { Status, Issue } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { Badge } from "@radix-ui/themes";
import React from "react";

const stautsMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  COMPLETED: { label: "Closed", color: "green" },
};
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={stautsMap[status].color}>{stautsMap[status].label} </Badge>
  );
};
export default IssueStatusBadge;
