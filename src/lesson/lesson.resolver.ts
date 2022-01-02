import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { Lesson } from './lesson.entity';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons(): Promise<LessonType[]> {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { studentIds, lessonId } = assignStudentToLessonInput;
    return this.lessonService.assignStudentsToLesson(studentIds, lessonId);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
