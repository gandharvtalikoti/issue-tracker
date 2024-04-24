"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();
  const [err, setError] = useState('');

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="max-w-xl">
      {err && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{err}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError('An unexpexted error occured');
            console.log(error);

          }
        })}
        className="space-y-3 "
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button> Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
