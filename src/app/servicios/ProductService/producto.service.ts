import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  agregarACarrito(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito`, { id });
  }

  getCarrito(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carrito`);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  vaciarCarrito(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito`);
  }
}
