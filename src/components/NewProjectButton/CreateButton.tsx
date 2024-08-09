import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import CreatingPage from "./CreatingPage";

const CreateButton = ({ onClick }: any) => (
  <>
    <CreatingPage />
    <Button className="inline-flex gap-2" onClick={onClick}>
      <PlusCircledIcon color="currentColor" className="h-4 w-4" />
      <div className="hidden sm:block">Create</div>
    </Button>
  </>
);

export default CreateButton;
