import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Role } from '../../models/role.model';
import { RolesService } from '../../services/roles.service';
import { EmployeeRole } from '../../models/employee-role.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, FormsModule, ReactiveFormsModule, CommonModule, NgFor, NgIf, AddRoleComponent, MatRadioModule,MatInputModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss',
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  employee: Employee = new Employee();
  employeeId: number = -1;
  roles: Role[];
  myRoles: EmployeeRole[] = [];
  availableRoles: Role[];
  showDateInput: number = -1;
  roleStartDate: Date;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private _employeesService: EmployeesService, private _rolesService: RolesService, private _router: Router) { }
  ngOnInit(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // רענון הדף בכל פעם שהניווט משתנה
      window.location.reload();
    });

    this.getEmployee().finally(() => {
      this.getRoles().then(() => {
        this.filterRoles();
        this.initForm();
      });
    });
    this.initForm()
  }

  getEmployee(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.params.subscribe((param) => {
        if (param['empId']) {
          this.employeeId = param['empId'];
          this._employeesService.getEmployeeById(this.employeeId).subscribe({
            next: res => {
              this.employee = res;
              if (this.employee) {
                this.myRoles = this.employee.roles;
                this.myRoles.forEach(role => {
                  role.roleId = role.role.id;
                  role.startDate = this.formatDate(role.startDate);
                });
                resolve(); // סיום בהצלחה
              } else {
                console.error('Employee not found');
                reject('Employee not found'); // סיום עם שגיאה
              }
            },
            error: err => {
              console.error('Error fetching employee data:', err);
              reject(err); // סיום עם שגיאה
            }
          });
        } else {
          this.employeeId = -1;
          // אם לא מוגדר 'empId', נסיים את ה Promise עם שגיאה
          reject('Employee ID not provided');
        }
      });
    });
  }

  getRoles(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._rolesService.getRoles().subscribe({
        next: res => {
          this.roles = res;
          resolve(); // סיום כאשר המידע נטען בהצלחה
        },
        error: err => {
          console.error('Error fetching roles:', err);
          reject(err); // סיום עם שגיאה
        }
      });
    });
  }
  filterRoles() {
    this.availableRoles = this.roles.filter(role => !this.myRoles.some(employeeRole => employeeRole.role.id == role.id));
  }
  initForm() {
    this.employeeForm = new FormGroup({
      tz: new FormControl(this.employee.tz, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      firstName: new FormControl(this.employee.firstName, [Validators.required]),
      lastName: new FormControl(this.employee.lastName, [Validators.required]),
      entryDate: new FormControl(this.employee.entryDate, [Validators.required]),
      birthDate: new FormControl(this.employee.birthDate, [Validators.required]),
      kindOf: new FormControl(this.employee.kindOf, [Validators.required]),
    })
  }

  showAddRoleForm() {
    const dialogRef = this.dialog.open(AddRoleComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getRoles().then(() => this.filterRoles()
      )
    });
  }
  openDateInput(i: number) {
    this.roleStartDate = undefined;
    this.showDateInput = i;
  }
  removeRole(r: Role) {
    this.myRoles.splice(this.myRoles.findIndex(role => role.roleId == r.id), 1)
    this.availableRoles.push(r)
  }
  addRole(r: Role) {
    if (!this.roleStartDate) {
      // נציג הודעת שגיאה אם תאריך ההתחלה ריק
      console.error('תאריך ההתחלה חובה');
      return;
    }
    this.myRoles.push(new EmployeeRole(r.id, r, this.roleStartDate));
    this.roleStartDate = undefined
    this.availableRoles.splice(this.availableRoles.findIndex(roll => roll.id == r.id), 1)
    this.showDateInput = -1;
  }

  formatDate(date) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date))
      return date;
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  onSubmit() {
    this.employee = this.employeeForm.value;
    this.employee.roles = this.myRoles;
    this.employee.birthDate = this.formatDate(this.employee.birthDate);
    this.employee.entryDate = this.formatDate(this.employee.entryDate);
    if (this.employeeId == -1)
      this._employeesService.addEmployee(this.employee).subscribe(() => Swal.fire({
        position: "top-end",
        icon: "success",
        title: "העובד נוסף בהצלחה",
        showConfirmButton: false,
        timer: 1500
      }).then(() => this._router.navigate(['/allEmployees'])), error => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "ארעה שגיאה בשמירת העובד, בדוק את הפרטים ונסה שנית",
          showConfirmButton: false,
          timer: 2500
        });
      })
    else
      this._employeesService.editEmployee(this.employee, this.employeeId).subscribe(y => Swal.fire({
        position: "top-end",
        icon: "success",
        title: "פרטי העובד עודכנו בהצלחה",
        showConfirmButton: false,
        timer: 1500
      }).then(() => this._router.navigate(['/allEmployees'])), error => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "ארעה שגיאה בשמירת העובד, בדוק את הפרטים ונסה שנית",
          showConfirmButton: false,
          timer: 2500
        });
      })
  }
  cancel() {
    this._router.navigate(["/allEmployees"])
  }
}