import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/student.entity';
import { StudentService } from '../student/student.service';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student])],
  providers: [LessonResolver, LessonService, StudentService],
})
export class LessonModule {}
