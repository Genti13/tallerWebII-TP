import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: ItemCarrito[] = [];

  getItems(): ItemCarrito[] {
    return this.items;
  }

  addItem(producto: Producto, cantidad: number = 1): void {
    console.log(producto)
    const existente = this.items.find(item => item.producto.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  updateQuantity(index: number, nuevaCantidad: number): void {
    if (index >= 0 && index < this.items.length && nuevaCantidad > 0) {
      this.items[index].cantidad = nuevaCantidad;
    }
  }

  clearCart(): void {
    this.items = [];
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
