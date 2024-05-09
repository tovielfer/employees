import { Routes } from '@angular/router';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes: Routes = [
    { path: "", component: AllEmployeesComponent },
    { path: "allEmployees", component: AllEmployeesComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LoginComponent },
    { path: "add-edit", component: AddEditEmployeeComponent, canActivate: [AuthGuardService] }
];
