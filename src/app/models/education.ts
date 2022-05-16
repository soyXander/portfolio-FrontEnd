export class Education {
  id?: number;
  institute: string;
  certification: string;
  description: string;

  constructor(institute: string, certification: string, description: string) {
    this.institute = institute;
    this.certification = certification;
    this.description = description;
  }
}
