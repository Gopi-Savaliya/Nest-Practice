import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { students, teachers } from "../../db";

@Injectable()
export class ValidTeacherStudentMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const teacherId = req.params.teacherId;
        const studentId = req.params.studentId;
        const teacherExists = teachers.some(teacher => {
            return teacher.id === teacherId;
        });
        const studentExists = students.some(student => {
            return student.id === studentId;
        });

        if(!teacherExists) {
            throw new HttpException("Teacher not found", 400);
        }
        if(!studentExists){
            throw new HttpException("Student not found", 400);
        }
        next();
    }
}