import { Image } from "./image";

export class Education {
  id?: number;
  institute: string;
  certification: string;
  description: string;
  image: Image;

  constructor(institute: string, certification: string, description: string) {
    this.institute = institute;
    this.certification = certification;
    this.description = description;
  }
}
