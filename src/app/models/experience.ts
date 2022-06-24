import { Image } from "./image";

export class Experience {
  id?: number;
  company: string;
  position: string;
  description: string;
  image: Image;

  constructor(company: string, position: string, description: string) {
	  this.company = company;
	  this.position = position;
	  this.description = description;
  }
}
