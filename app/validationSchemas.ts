import { z } from "zod";


// here you can add all your validation schemas of your application so that your code will be well organised

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});
