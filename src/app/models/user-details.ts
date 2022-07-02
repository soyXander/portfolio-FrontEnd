import { Image } from "./image";

export class UserDetails {
  id?: number;
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  description: string;
  image: Image;
  facebookId: string;
  instagramId: string;
  githubId: string;
  linkedinId: string;
  twitterId: string;

  constructor(firstName: string, lastName: string, location: string, title: string, description: string, facebookId: string, instagramId: string, githubId: string, linkedinId: string, twitterId: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.title = title;
    this.description = description;
    this.facebookId = facebookId;
    this.instagramId = instagramId;
    this.githubId = githubId;
    this.linkedinId = linkedinId;
    this.twitterId = twitterId;
  }
}
