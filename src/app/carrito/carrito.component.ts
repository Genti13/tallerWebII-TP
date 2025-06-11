import { Component } from '@angular/core';
import { CarritoService } from '../services_carrito/carrito.service';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(
  public carritoService: CarritoService,
  private toastr: ToastrService
) {}

  get items(): Producto[] {
    return this.carritoService.getItems();
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.precio, 0);
  }

  eliminarItem(index: number): void {
    const prod = this.items[index];
    this.carritoService.removeItem(index);
    this.toastr.info(
      'Producto eliminado del carrito',
      prod.nombre,
      {
        timeOut: 1800,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }

  vaciarCarrito(): void {
    this.carritoService.clearCart();
    this.toastr.warning(
      'Carrito vaciado',
      '',
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }
}
