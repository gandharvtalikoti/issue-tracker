import Image from "next/image";
import Pagination from "./components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LastestIssues from "./LastestIssues";

export default function Home() {
  return (
    <>
      <LastestIssues />
    </>
  );
}
