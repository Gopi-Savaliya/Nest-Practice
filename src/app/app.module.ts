import { Module } from '@nestjs/common';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';


@Module({
  imports: [StudentModule, TeacherModule],
})
export class AppModule {}
