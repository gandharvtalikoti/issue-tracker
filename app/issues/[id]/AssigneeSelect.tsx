"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// now to populate select users with the users in the database
// we have to build an API endpoint because this is a CLIENT componenent
// and we CANNOT ACCESS PRISMA ON CLIENT COMPONENT
// PRISMA IS ONLY AVAILABLE ON SERVER
const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "null" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
