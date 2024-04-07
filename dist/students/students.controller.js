"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
let StudentsController = class StudentsController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    createStudent(body) {
        return this.studentService.createStudent(body);
    }
    allStudents() {
        return this.studentService.fillAllStudents();
    }
    findOne(identification) {
        return this.studentService.findOneStudent(identification);
    }
    updateStudent(id, body) {
        return this.studentService.updateStudent({ identification: id }, body);
    }
    deleteUser(id) {
        return this.studentService.deleteStudent({ identification: id });
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "allStudents", null);
__decorate([
    (0, common_1.Get)(':identification'),
    __param(0, (0, common_1.Param)('identification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('/update/:identification'),
    __param(0, (0, common_1.Param)('identification')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('delete/:identification'),
    __param(0, (0, common_1.Param)('identification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "deleteUser", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map