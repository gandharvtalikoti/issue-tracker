import prisma from "@/prisma/client";

import Pagination from "@/app/components/Pagination";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}
// add searchParams to filter by status
const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where, // filtering out by status, check line number 35
    orderBy,
    skip: (page - 1) * pageSize, // number of records we should skip
    take: pageSize, // number of records we wanna fetch
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 10;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
export default IssuesPage;
