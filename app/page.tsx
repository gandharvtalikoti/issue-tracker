import Image from "next/image";
import Pagination from "./components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LastestIssues from "./LastestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "COMPLETED" } });

  return (
    <>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
