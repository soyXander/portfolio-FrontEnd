export class Project {
  id: number;
  project: string;
  technology: string;
  description: string;

  constructor(project: string, technology: string, description: string) {
    this.project = project;
    this.technology = technology;
    this.description = description;
  }
}
