import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  employeeBaseUrl = 'https://localhost:44308/api/employee';
  typeBaseUrl = 'https://localhost:44308/api/type';

  getEmployee(): Observable<any> {
    return this.http.request("GET", `${this.employeeBaseUrl}`);
  }

  editEmployee(id: number, value: any): Observable<Object> {
    console.log(id);
    return this.http.put(`${this.employeeBaseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<Object>  {
    return this.http.request("DELETE", `${this.employeeBaseUrl}/${id}`);
  }

  addEmployee(employee): Observable<Object> {
    console.log(employee);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post( `${this.employeeBaseUrl}`, employee);
  }

  getType(): Observable<any> {
    return this.http.get(`${this.typeBaseUrl}`);
  }

  addType(type): Observable<Object> {
    //console.log(type);
    return this.http.post(`${this.typeBaseUrl}`, type);
  }
}
