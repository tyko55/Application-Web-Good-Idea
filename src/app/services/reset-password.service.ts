import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl:string = "https://localhost:7181/api/User";

  constructor(private http: HttpClient) { }
 
  sendRestPasswordLink(userObj:any) {
    return this.http.post<any>(this.baseUrl+'/send-reset-email',userObj);
   
  }

  resetPassword(resetPasswordObj: ResetPassword) {
   
    return this.http.post<any>(this.baseUrl+'/reset-password', resetPasswordObj);
  }


}
