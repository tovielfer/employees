import { Component } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/role.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [MatButtonModule,MatRadioModule,FormsModule,ReactiveFormsModule,NgIf,MatInputModule,MatFormFieldModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  roleForm: FormGroup;
  newRole:Role;
  constructor(private dialogRef: MatDialogRef<any>,private _rolesService:RolesService) {
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      isAdminstrative: new FormControl("false", [Validators.required])
    })
  }
  addRole() {
    this.newRole = this.roleForm.value;
    this.newRole.isAdminstrative=this.newRole.isAdminstrative==true;
    this._rolesService.addRole(this.newRole).subscribe(
      (response) => {
        console.log(response); // הדפסת התגובה מהשרת לצורך בדיקה
         this.dialogRef.close(this.roleForm.value); // סגירת הדיאלוג לאחר הצלחת הבקשה
      },
      (error) => {
        console.error(error); 
      }
    );
  }
}
