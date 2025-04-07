import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/config/prisma/prisma.exception';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createBlog(createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.prismaService.blogs.create({
        data: createBlogDto,
      });
      return blog;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async getAllBlogs() {
    try {
      const blogs = await this.prismaService.blogs.findMany();
      return blogs;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async getBlogById(id: number) {
    try {
      const blog = await this.prismaService.blogs.findUnique({
        where: { id },
      });
      return blog;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async updateBlogById(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      const blog = await this.prismaService.blogs.update({
        where: { id },
        data: updateBlogDto,
      });
      return blog;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
  async deleteBlogById(id: number) {
    try {
      const blog = await this.prismaService.blogs.delete({
        where: { id },
      });
      return blog;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
