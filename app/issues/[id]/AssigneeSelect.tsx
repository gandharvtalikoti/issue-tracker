"use client";
import { User } from "@prisma/client";
import { Avatar, Select } from "@radix-ui/themes";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const AssigneeSelect = () => {
  // now to populate select users with the users in the database
  // we have to build an API endpoitn because this is a CLIENT componenent
  // and we CANNOT ACCESS PRISMA ON CLIENT COMPONENT
  // PRISMA IS ONLY AVAILABLE ON SERVER

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users"); // Make sure the response is an array
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item  key={user.id} value={user.id}>
            
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
