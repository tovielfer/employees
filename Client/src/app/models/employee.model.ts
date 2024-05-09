import { EmployeeRole } from "./employee-role.model";

export class Employee {
   id: number;
   tz: string;
   firstName: string;
   lastName: string;
   birthDate: Date;
   status: boolean;
   entryDate: Date;
   kindOf: Kind;
   roles: EmployeeRole[];
}
export enum Kind { זכר=0, נקבה=1 }