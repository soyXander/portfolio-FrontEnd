import { Image } from "./image";

export class Project {
  id: number;
  project: string;
  technology: string;
  description: string;
  image: Image;

  constructor(project: string, technology: string, description: string) {
    this.project = project;
    this.technology = technology;
    this.description = description;
  }
}
