import { Credit, defaultCredit } from "@/types/projectMetadataForm";
import { useEffect, useState } from "react";
import useAttestation from "./useAttestation";
import useProjectMedia from "./useProjectMedia";

const useProject = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [animationUrl, setAnimationUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<string>("");
  const [credits, setCredits] = useState<Credit[]>([defaultCredit]);
  const { dashboardData }: any = useAttestation();
  useProjectMedia(animationUrl, image, name);
  const [creating, setCreating] = useState(false)

  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      setCredits(dashboardData["credits"] || [defaultCredit]);
      setAnimationUrl(dashboardData["animationUrl"] || "");
      setImage(dashboardData["image"] || "");
    }
  };

  useEffect(() => {
    dashboardData && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData]);

  return {
    credits,
    setCredits,
    name,
    setName,
    description,
    setDescription,
    animationUrl,
    setAnimationUrl,
    ethPrice,
    setEthPrice,
    image,
    setImage,
    creating,
    setCreating,
  };
};

export default useProject;
