import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 private API_URL = `${environment.apiUrl}/register`;


  constructor(private http: HttpClient) {}

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }
}
