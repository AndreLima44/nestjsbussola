import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Course } from './course.entity';
import { CourseNotFoundException } from '../exceptions/course-not-found.exception';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } } as FindOneOptions<Course>);
    if (!course) {
      throw new CourseNotFoundException(id);
    }
    return course;
  }

  async create(course: Course): Promise<Course> {
    return this.coursesRepository.save(course);
  }

  async update(id: number, course: Course): Promise<void> {
    await this.coursesRepository.update(id, course);
  }

  async remove(id: number): Promise<void> {
    const result = await this.coursesRepository.delete(id);
    if (result.affected === 0) {
      throw new CourseNotFoundException(id);
    }
  }
}
