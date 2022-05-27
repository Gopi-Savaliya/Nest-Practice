import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { teachers } from "../../db";

@Injectable()
export class ValidTeacherMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const teacherId = req.params.teacherId;
        const teacherExists = teachers.some(teacher => {
            return teacher.id === teacherId;
        });
        if(!teacherExists) {
            throw new HttpException("Teacher not found", 400);
        }
        next();
    }
}