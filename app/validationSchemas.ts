import { z } from "zod";

// here you can add all your validation schemas of your application so that your code will be well organised

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

export const pathIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .max(65535)
    .min(1, "Description is required")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedUserID is required")
    .max(255)
    .optional()
    .nullable(),
});
