import { Injectable } from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}
  async createBlog(createBlogDto: CreateBlogDto) {
    return this.blogRepository.createBlog(createBlogDto);
  }
  async getAllBlogs() {
    return this.blogRepository.getAllBlogs();
  }
  async getBlogById(id: number) {
    return this.blogRepository.getBlogById(id);
  }

  async updateBlogById(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.updateBlogById(id, updateBlogDto);
  }

  async deleteBlogById(id: number) {
    return this.blogRepository.deleteBlogById(id);
  }
}
