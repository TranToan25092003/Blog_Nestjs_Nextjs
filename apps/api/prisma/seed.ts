import { fa, faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '');
};

async function main() {
  const users = Array.from({ length: 10 }).map(() => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
    };
  });

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 40 }).map(() => {
    return {
      title: faker.lorem.sentence(),
      slug: genSlug(faker.lorem.sentence()),
      content: faker.lorem.paragraph(3),
      thumbnail: faker.image.urlLoremFlickr(),
      authorId: faker.number.int({ min: 1, max: 10 }),
      published: true,
    };
  });

  await Promise.all(
    posts.map(async (post) => {
      return await prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => {
                return {
                  content: faker.lorem.sentence(),
                  authorId: faker.number.int({ min: 1, max: 10 }),
                };
              }),
            },
          },
        },
      });
    }),
  );

  console.log('Seeding completed');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.log(e);
    process.exit(1);
  });
