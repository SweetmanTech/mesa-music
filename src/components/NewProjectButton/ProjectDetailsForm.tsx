import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import CreateButton from "./CreateButton";
import { toast } from "../ui/use-toast";
import { usePaymasterProvider } from "../../context/Paymasters";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";
import { useProjectProvider } from "@/context/ProjectProvider";
import { defaultCredit } from "@/types/projectMetadataForm";
import { useProfileProvider } from "@/context/ProfileProvider";

export default function ProjectDetailsForm() {
  const { id } = usePaymasterProvider();
  const { attest } = usePaymasterAttest();
  const [loading, setLoading] = useState<boolean>(false);
  const { name, setName, setDescription, setCredits } = useProjectProvider();
  const { user } = useProfileProvider();

  useEffect(() => {
    if (id !== undefined) {
      toast({
        title: "Success",
        description: "Project Created Successfully!",
        variant: "default",
      });
      location.reload();
    }
  }, [id]);

  const handleClick = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Title and Description are required.",
        variant: "default",
      });
      return;
    }

    setLoading(true);

    try {
      await attest();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCredits([{...defaultCredit, name: user.username }]);
  }, [])

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder=""
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="title">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder=""
          autoCapitalize="none"
          autoCorrect="off"
          onBlur={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <DialogClose>
          <Button variant="outline" color="gray">
            Close
          </Button>
        </DialogClose>
        {loading ? (
          <Button className="inline-flex gap-2">
            <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
            Creating...
          </Button>
        ) : (
          <CreateButton onClick={handleClick} />
        )}
      </div>
    </div>
  );
}
