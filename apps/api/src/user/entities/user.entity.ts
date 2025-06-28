import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => {
    return Int;
  })
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => {
    return [Post];
  })
  posts?: Post[];

  @Field(() => {
    return [Comment];
  })
  comments: Comment[];
}
