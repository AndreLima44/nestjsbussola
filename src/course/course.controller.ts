import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() course: Course): Promise<void> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.courseService.remove(id);
  }
}
