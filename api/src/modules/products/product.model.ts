import { trophies } from '@prisma/client';

// trophies is used but you can be prints, medals, etc
export class Product implements trophies {
  name: string;
  id: number;
  category: string;
  description: string;
  color: string;
  image: string;
  height: string;
}
