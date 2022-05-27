import { Controller, Get, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { FindStudentResponseDto, StudentResponseDto } from "../student/dto/student.dto";
import { StudentService } from "../student/student.service";

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {

    constructor(private readonly studentService: StudentService) {}

    @Get()
    getStudentsByTeacherId(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string
    ): FindStudentResponseDto[] {
        return this.studentService.getStudentsByTeacherId(teacherId);
    }
    
    @Put('/:studentId')
    updateStudentByIdFromTeacherId(
        // @Param() Param: {teacherId: string, studentId: string},
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
    ): StudentResponseDto {
        return this.studentService.updateStudentByIdFromTeacherId(teacherId, studentId);
    }
}