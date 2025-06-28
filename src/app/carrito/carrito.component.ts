import { Component } from '@angular/core';
import { CarritoService, ItemCarrito } from '../servicios/CartService/carrito.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../servicios/AuthService/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'none' })),
      ])
    ])
  ]
})
export class CarritoComponent {
  constructor(
    public carritoService: CarritoService,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  get items(): ItemCarrito[] {
    return this.carritoService.getItems();
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  }

  // Función para ir a productos cuando el carrito está vacío
  irAProductos(): void {
    this.router.navigate(['/productos']);
    this.toastr.info(
      '¡Explora nuestros productos!',
      'Navegando a productos',
      {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }

  // Función para iniciar sesión
  iniciarSesion(): void {
    this.router.navigate(['/login']);
    this.toastr.info(
      'Redirigiendo al login',
      'Iniciar sesión',
      {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }

  // Función para registrarse
  registrarse(): void {
    this.router.navigate(['/register']);
    this.toastr.info(
      'Redirigiendo al registro',
      'Crear cuenta',
      {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }

  incrementarCantidad(index: number): void {
    const item = this.items[index];
    this.carritoService.updateQuantity(index, item.cantidad + 1);
    this.toastr.success(
      `Cantidad de ${item.producto.nombre} aumentada`,
      'Cantidad actualizada',
      {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toastr'
      }
    );
  }

  decrementarCantidad(index: number): void {
    const item = this.items[index];
    if (item.cantidad > 1) {
      this.carritoService.updateQuantity(index, item.cantidad - 1);
      this.toastr.info(
        `Cantidad de ${item.producto.nombre} disminuida`,
        'Cantidad actualizada',
        {
          timeOut: 1500,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );
    } else {
      this.toastr.warning(
        'La cantidad mínima es 1',
        'Cantidad mínima',
        {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );
    }
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

  continuarCompra() {
    this.router.navigate(['/contacto-compra']);
  }
}
