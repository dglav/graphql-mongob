import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];

  @IsUUID()
  @Field(() => ID)
  lessonId: string;
}
