import { Image } from "./image";

export class Experience {
  id?: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  image: Image;

  constructor(company: string, position: string, description: string, startDate: string, endDate: string) {
	  this.company = company;
	  this.position = position;
	  this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
