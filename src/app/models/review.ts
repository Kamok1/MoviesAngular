import {User} from 'src/app/models/user'
export class Review{
  reviewId! : number;
  title!: string;
  body!: string;
  rate!: number;
  user!: User;
}
