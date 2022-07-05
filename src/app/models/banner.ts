import { Image } from "./image";

export class Banner {
  id?: number;
  image: Image;

  constructor(id: number, image: Image) {
    this.id = id;
    this.image = image;
  }
}
