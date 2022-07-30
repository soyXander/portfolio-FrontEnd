import { Image } from "./image";

export class Education {
  id?: number;
  institute: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  image: Image;

  constructor(institute: string, degree: string, description: string, startDate: string, endDate: string) {
    this.institute = institute;
    this.degree = degree;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
