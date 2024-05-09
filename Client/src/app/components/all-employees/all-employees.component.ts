import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [NgForOf,MatTableModule,MatIconModule,FormsModule,NgIf,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  pattern:string="";
  constructor(private _employeesService: EmployeesService, private _router: Router) { }
  ngOnInit(): void {
    this.getEmployees()
  }
  getEmployees() {
    this._employeesService.getEmployees().subscribe({
      next: res =>
        this.employees = res
    })
  }
  deleteEmployee(e: Employee) {
    Swal.fire({
      title: 'האם אתה בטוח שברצונך למחוק עובד זה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול',
    }).then((result) => {
      if (result.isConfirmed){
        if(localStorage.getItem("userToken") != null){
        this._employeesService.deleteEmployee(e.id).subscribe({
          next: res => {
            console.log(res)
            this._employeesService.getEmployees().subscribe(d=>this.employees=d)
          }
        })
   }else
  this._router.navigate(['/login']) }});
  }
  editEmployee(e) {
    this._router.navigate(["/add-edit", { "empId": e.id }])
  }
  exportToExcel(): void {
    const data: any[] = [];
    const headers = ['שם פרטי', 'שם משפחה', 'מספר זהות', 'מין', 'תאריך לידה', 'תאריך כניסה לעבודה', 'רשימת תפקידים'];
    data.push(headers);
    this.employees.forEach((employee) => {
      const rolesNames = employee.roles.map(role => role.role.name).join(', '); // שמות התפקידים בלבד
      const rowData = [
        employee.firstName,
        employee.lastName,
        employee.tz,
        employee.kindOf === 0 ? 'זכר' : 'נקבה',
        employee.birthDate,
        employee.entryDate,
        rolesNames // הוספת שמות התפקידים בלבד
      ];
      data.push(rowData);
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }
  filter(e:Employee) {
    return  e.firstName.includes(this.pattern) ||
      e.lastName.includes(this.pattern) ||
      e.tz.includes(this.pattern) || e.roles.some(r => r.role.name.includes(this.pattern));
  }
}
