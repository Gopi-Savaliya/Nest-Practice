import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidTeacherMiddleware } from '../common/middleware/validTeacher.middleware';
import { ValidTeacherStudentMiddleware } from '../common/middleware/validTeacherStudent.middleware';
import { StudentModule } from '../student/student.module';
import { StudentTeacherController } from './student.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    imports: [StudentModule],
    controllers: [TeacherController, StudentTeacherController],
    providers: [TeacherService]
})
export class TeacherModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidTeacherMiddleware).forRoutes({
            path: 'teachers/:teacherId',
            method: RequestMethod.GET
        });
        consumer.apply(ValidTeacherMiddleware).forRoutes({
            path: 'teachers/:teacherId/students',
            method: RequestMethod.GET
        })
        consumer.apply(ValidTeacherStudentMiddleware).forRoutes({
            path: 'teachers/:teacherId/students/:studentId',
            method: RequestMethod.PUT
        })
    }
}
