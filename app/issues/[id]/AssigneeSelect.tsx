"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Avatar, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const AssigneeSelect = () => {
  // now to populate select users with the users in the database
  // we have to build an API endpoint because this is a CLIENT componenent
  // and we CANNOT ACCESS PRISMA ON CLIENT COMPONENT
  // PRISMA IS ONLY AVAILABLE ON SERVER

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 100, // 60s
    retry: 3,
  });
  if (isLoading) return <Skeleton />;

  if (error) return null;

  // this way of fetching data is not optimal as it will not be stored in cache
  // it will have to make request everytime when user vistis this page
  // and that is the reason why we will use React Query to fetch data

  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users"); // Make sure the response is an array
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
