"use client";
import { ErrorMessage, SpinnerLoader } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from "zod";

// interface IssueForm {
//   title: string;
//   description: string;
// }

// generating interface automatically based on schema !
type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue; // have made this optional because we only need this in the edit page
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const [err, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.put("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();// this tells nextjs to refresh the content of the current route
    } catch (error) {
      setSubmitting(false);
      setError("An unexpexted error occured");
      console.log(error);
    }
  });

  

  return (
    <div className="max-w-xl">
      {err && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{err}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3 ">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue": "Submit new issue"}
          {isSubmitting && <SpinnerLoader />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
