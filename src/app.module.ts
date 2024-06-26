import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { User } from './user/user.entity';
import { Course } from './course/course.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Course],
      synchronize: true,
    }),
    UserModule,
    CourseModule,
    AuthModule,
  ],
})
export class AppModule {}
