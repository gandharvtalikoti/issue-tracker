import React from "react";
import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      {/* this is for title */}
      <Skeleton height="2rem" />
      {/* this is for description */}
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
