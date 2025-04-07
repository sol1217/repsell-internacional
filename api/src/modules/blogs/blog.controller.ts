import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({
    summary: 'Create a blog',
    description: 'Create a new blog post',
    responses: {
      201: {
        description: 'Blog created successfully',
      },
      400: {
        description: 'Invalid input data',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @ApiOperation({
    summary: 'Get all blogs',
    description: 'Get all blog posts',
    responses: {
      200: {
        description: 'List of all blogs',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @ApiOperation({
    summary: 'Get a blog by ID',
    description: 'Get a specific blog post by its ID',
    responses: {
      200: {
        description: 'Blog found successfully',
      },
      400: {
        description: 'Invalid blog ID',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Get(':id')
  async getBlogById(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  @ApiOperation({
    summary: 'Update a blog by ID',
    description: 'Update a specific blog post by its ID',
    responses: {
      200: {
        description: 'Blog updated successfully',
      },
      400: {
        description: 'Invalid blog ID or input data',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Patch(':id')
  async updateBlogById(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlogById(id, updateBlogDto);
  }

  @ApiOperation({
    summary: 'Delete a blog by ID',
    description: 'Delete a specific blog post by its ID',
    responses: {
      200: {
        description: 'Blog deleted successfully',
      },
      400: {
        description: 'Invalid blog ID',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Delete(':id')
  async deleteBlogById(@Param('id') id: number) {
    return this.blogService.deleteBlogById(id);
  }
}
