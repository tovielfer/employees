import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { HttpClient } from '@angular/common/http';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AllEmployeesComponent, AddEditEmployeeComponent, HeaderComponent],
  providers: [HttpClient, UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employees';
}
