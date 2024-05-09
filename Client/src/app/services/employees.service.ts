import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, Kind } from '../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
header;
token;
  constructor(private _http: HttpClient) { }
  initTokenAndHeader() {
    this.token = localStorage?.getItem('userToken');
    this.header = new HttpHeaders().set('Authorization', this.token);
}
  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`https://localhost:7139/api/Employee`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`https://localhost:7139/api/Employee/${id}`);
  }
  addEmployee(e:Employee) {
    this.initTokenAndHeader();
    return this._http.post('https://localhost:7139/api/Employee', e,{ 'headers': this.header });
  }
  editEmployee(e:Employee, id: number) {
    this.initTokenAndHeader();
    return this._http.put(`https://localhost:7139/api/Employee/${id}`, e,{ 'headers': this.header });
  }
  deleteEmployee(id: number) {
    this.initTokenAndHeader();
    return this._http.delete(`https://localhost:7139/api/Employee/${id}`,{ 'headers': this.header });
  }
}
