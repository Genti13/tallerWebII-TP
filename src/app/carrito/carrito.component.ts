import { Component } from '@angular/core';
import { CarritoService, ItemCarrito } from '../servicios/CartService/carrito.service';
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

  get items(): ItemCarrito[] {
    return this.carritoService.getItems();
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  }

  eliminarItem(index: number): void {
    const prod = this.items[index].producto;
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
