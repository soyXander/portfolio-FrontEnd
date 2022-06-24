export class Image {
  id?: number;
  name: string;
  type: string;
  image: File;

  constructor(name: string, type: string, image: File) {
    this.name = name;
    this.type = type;
    this.image = image;
  }
}
