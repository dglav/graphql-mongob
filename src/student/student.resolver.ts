import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver()
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // memo: How to handle it when student is not found? Should I just leave it as an error?
  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
