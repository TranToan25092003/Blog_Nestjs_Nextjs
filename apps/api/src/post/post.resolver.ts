import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // get all posts
  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context,

    // arg skip
    @Args('skip', {
      nullable: true,
    })
    skip?: number,

    // arg rake
    @Args('take', {
      nullable: true,
    })
    take?: number,
  ) {
    return this.postService.findAll({
      take,
      skip,
    });
  }

  //count posts
  @Query(() => Int, { name: 'postcount' })
  count() {
    return this.postService.count();
  }
}
