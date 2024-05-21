import Image from "next/image";
import Pagination from "./components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
