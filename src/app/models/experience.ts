export class Experience {
  id?: number;
  companyName: string;
  position: string;
  description: string;

  constructor(companyName: string, position: string, description: string) {
	  this.companyName = companyName;
	  this.position = position;
	  this.description = description;
  }
}
