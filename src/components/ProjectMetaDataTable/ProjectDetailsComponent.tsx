import React from "react";

import Chat from "@/components/ProjectChatBox/Chat";
import { ProjectCollaborators } from "../ProjectCollaborators";
import ProjectDetailsCard from "../ProjectDetailsCard";
import { ProjectDetailsComponentProps } from "@/types/const";
import UploadButton from "../Project/UploadButton";
import { useProjectProvider } from "@/context/ProjectProvider";

const ProjectDetailsComponent = ({ project }: ProjectDetailsComponentProps) => {
  const { name, description } = useProjectProvider();

  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
      <ProjectDetailsCard projectName={name} projectDescription={description} />
      <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
        <div className="w-full">
          <ProjectCollaborators project={project} />
          <UploadButton projectId={String(project.id)} />
        </div>
        <div className="w-full lg:max-w-[400px]">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsComponent;
