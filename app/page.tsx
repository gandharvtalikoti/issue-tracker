import Image from "next/image";
import Pagination from "./components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
      
    </>
  );
}
