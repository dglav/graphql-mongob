import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudent(id: string) {
    return this.studentRepository.findOne({ id });
  }

  async getStudents() {
    return this.studentRepository.find();
  }

  async getManyStudents(ids: string[]) {
    return this.studentRepository.find({
      where: {
        id: {
          $in: ids,
        },
      },
    });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
}
