import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable()
export class UsersService {
    token;
    header;
    private userUrl = 'https://localhost:7139/api';
    constructor(private _http: HttpClient) { }
    // initTokenAndHeaderForPassword() {
    //     this.token = localStorage?.getItem('userToken');
    //     this.header = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': this.token
    //     })
    // }
    // initTokenAndHeader() {
    //     this.token = localStorage?.getItem('userToken');
    //     this.header = new HttpHeaders().set('Authorization', this.token);
    // }
    loginUser(user: User): Observable<any> {
        return this._http.post<any>(`${this.userUrl}/Auth`, user);
    }
    // checkPassword(password: any): Observable<boolean> {
    //     this.initTokenAndHeaderForPassword()
    //     return this._http.post<boolean>(`${this.userUrl}/Auth/register`, JSON.stringify(password), { 'headers': this.header });
    // }
    // addUser(user: User): Observable<User> {
    //     this.initTokenAndHeader();
    //     return this._http.post<User>(`${this.userUrl}/Users`, user, { 'headers': this.header });
    // }
}