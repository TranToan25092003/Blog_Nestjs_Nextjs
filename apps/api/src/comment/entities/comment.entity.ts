import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => {
    return Int;
  })
  id: number;

  @Field()
  content: string;

  @Field(() => {
    return Post;
  })
  post: Post;

  @Field(() => {
    return User;
  })
  author: User;

  @Field()
  createdAt: Date;
}
