import { Module } from "@nestjs/common";
import { BackgroundRepository } from "./background.repository";
import { BackgroundService } from "./background.service";
import { BackgroundController } from "./background.controller";

@Module({
    providers:[BackgroundRepository,BackgroundService],
    controllers:[BackgroundController]
})
export class BackgroundModule{}