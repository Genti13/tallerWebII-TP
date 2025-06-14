import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = `${environment.apiUrl}/login`;  // URL del backend + /login

  constructor(private http: HttpClient) {}

  loginUsuario(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }
}
