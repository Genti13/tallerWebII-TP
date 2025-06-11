import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: Producto[] = [];

  getItems(): Producto[] {
    return this.items;
  }

  addItem(producto: Producto): void {
    this.items.push(producto);
  }

  clearCart(): void {
    this.items = [];
  }
  removeItem(index: number): void {
  this.items.splice(index, 1);
}

}
