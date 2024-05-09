import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { RolesService } from '../../services/roles.service';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatButtonModule, NgIf,
    FormsModule,
    ReactiveFormsModule, MatIcon, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  standalone: true
})
export class LoginComponent {

  hide: boolean = true;
  loginForm!: FormGroup;
  user: User;

  constructor(private _userService: UsersService, private router: Router, private _roleService: RolesService, private _acr: ActivatedRoute) {
    this.user = new User();
    this.loginForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this._acr.paramMap.subscribe(paramMap => {
      if (paramMap)
        if (paramMap.has("isLogout")) {
          if (paramMap.get("isLogout")) {
            localStorage.removeItem('userToken');
            localStorage.removeItem("tokenTime");
          }
        }
    });
  }
  loginUser() {
    this.user = this.loginForm.value;
    this._userService.loginUser(this.user).subscribe(data => {
      localStorage?.setItem('userToken', 'Bearer ' + data.token);
      console.log
      localStorage.setItem("tokenTime", new Date().toString())
      Swal.fire({
        title: 'נכנסת בהצלחה!!!',
        icon: "success"
      })
      this.router.navigate(['/allEmployees'])
    }, () => Swal.fire({
      title: "שגיאה",
      text: "נסה שנית",
      icon: "error",
      timer: 1000,
      showConfirmButton: false
    })
    )
  }
}


