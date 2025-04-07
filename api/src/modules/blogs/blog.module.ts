import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogRepository } from "./blog.repository";
import { BlogController } from "./blog.controller";

@Module({
    providers:[BlogService, BlogRepository],
    controllers: [BlogController]
})
export class BlogModule {}