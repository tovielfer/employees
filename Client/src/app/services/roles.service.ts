import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  header;
  token;
  initTokenAndHeader() {
    this.token = localStorage?.getItem('userToken');
    this.header = new HttpHeaders().set('Authorization', this.token);
  }
  constructor(private _http: HttpClient) { }
  getRoles(): Observable<Role[]> {
    this.initTokenAndHeader();
    return this._http.get<Role[]>(`https://localhost:7139/api/Role`, { 'headers': this.header });
  }

  getRoleById(id: number): Observable<Role> {
    this.initTokenAndHeader();
    return this._http.get<Role>(`https://localhost:7139/api/Role/${id}`, { 'headers': this.header });
  }
  addRole(r: Role) {
    this.initTokenAndHeader();
    return this._http.post('https://localhost:7139/api/Role', r, { 'headers': this.header });
  }
  editEmployee(r: Role, id: number) {
    this.initTokenAndHeader();
    return this._http.put(`https://localhost:7139/api/Role/${id}`, r, { 'headers': this.header });
  }
  deleteRole(id: number) {
    this.initTokenAndHeader();
    return this._http.delete(`https://localhost:7139/api/Role/${id}`, { 'headers': this.header });
  }

}
