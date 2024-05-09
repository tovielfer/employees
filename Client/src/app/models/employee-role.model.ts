import { Employee } from "./employee.model";
import { Role } from "./role.model";

export class EmployeeRole {
    roleId: number;
    employeeId: number;
    role: Role;
    employee: Employee;
    startDate: Date;
  
    constructor(roleId: number, role: Role, startDate: Date) {
        this.roleId = roleId;
        this.role = role;
        this.startDate = startDate;
    }
}