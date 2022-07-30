import { Image } from "./image";

export class Project {
  id: number;
  project: string;
  creationDate: string;
  description: string;
  link: string;
  image: Image;

  constructor(project: string, creationDate: string, description: string, link: string) {
    this.project = project;
    this.creationDate = creationDate;
    this.description = description;
    this.link = link;
  }
}
