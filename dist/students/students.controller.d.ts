/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentService;
    constructor(studentService: StudentsService);
    createStudent(body: any): Promise<import("./schema/students.schema").Students>;
    allStudents(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/students.schema").Students> & import("./schema/students.schema").Students & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(identification: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/students.schema").Students> & import("./schema/students.schema").Students & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStudent(id: any, body: any): Promise<import("./schema/students.schema").Students>;
    deleteUser(id: string): Promise<import("./schema/students.schema").Students>;
}
