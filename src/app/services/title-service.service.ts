import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleServiceService {

  private baseUrl:string="https://localhost:7181/api/User_Title_";
  constructor(private http: HttpClient) { }
  getAllTitle(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getTitleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  saveTitle(titleObj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, titleObj);
  }

  deleteTitle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  updateTitle(id: number, titleObj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, titleObj);
  }

}
