import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prima: PrismaService) {}

  @Get()
  async getAllNotifications() {
    return this.prima.notification.findMany();
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    return this.prima.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
