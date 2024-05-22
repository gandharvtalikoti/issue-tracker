import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  // fetching data from database
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap="5"
    >
      {/*  this box is allocatted 4 cols out of 5 */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {/*  this box is allocatted 1 cols out of 5 */}

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

// here we wanna have dynamic meatadata based on the title of the issue
export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
