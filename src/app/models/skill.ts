export class Skill {
  id?: number;
  skill: string;
  percentage: number;

  constructor(skill: string, percentage: number) {
    this.skill = skill;
    this.percentage = percentage;
  }
}
