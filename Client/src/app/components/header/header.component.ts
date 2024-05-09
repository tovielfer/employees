import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, MatFormFieldModule, MatIconModule],

})
export class HeaderComponent {
  title = 'EmployeesApplication';
  roles: Role[];
  emp: Employee;
  constructor(private router: Router) { }
  connected(): boolean {
    const storedDateStr = localStorage.getItem("tokenTime");
    // המרת התאריך ממחרוזת לאובייקט תאריך
    const storedDate = new Date(storedDateStr);
    // קבלת התאריך הנוכחי
    const currentDate = new Date();

    // חישוב הזמן בין התאריכים בשעות
    const timeDiffInHours = (currentDate.getTime() - storedDate.getTime()) / (1000 * 60 * 60);
    return timeDiffInHours <= 5
  }
  login() {
    this.router.navigate(['/login', { isLogout: true }]);
  }
  logout() {
    if (typeof window !== undefined) {
      Swal.fire({
        title: 'האם אתה בטוח שברצונך להתנתק?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, התנתק!',
        cancelButtonText: 'לא, אני רוצה להישאר מחובר',
        reverseButtons: true // כאן הגדרת הפרמטר האופציונלי
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/logout', { isLogout: true }]);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['/allEmployees']);
        }
      });
    }
  }
  addEmployee() {
    this.router.navigate(['/add-edit'])
  }
}
