import { Metadata } from "next";
import NotFoundComponent from "../components/shared/NotFound";

export const metadata: Metadata = {
  title: "Project Not Found",
};

export default function ProjectNotFound() {
  return (
    <NotFoundComponent
      title="Project Not Found"
      description="You've managed to navigate to a project that does not exist or is not published yet. Please return to the projects overview."
    />
  );
}
