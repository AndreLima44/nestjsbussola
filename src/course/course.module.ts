import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DiscountMiddleware } from '../middleware/discount.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DiscountMiddleware)
      .forRoutes('course');
  }
}
