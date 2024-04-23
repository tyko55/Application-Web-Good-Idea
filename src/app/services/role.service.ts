import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl:string="https://localhost:7181/api/User_Role_";
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
    
  }

  addRole(role: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, role);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
