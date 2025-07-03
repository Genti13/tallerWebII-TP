import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../servicios/CartService/carrito.service';
import { PedidoService } from '../servicios/PedidoService/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacto-compra.component.html',
  styleUrl: './contacto-compra.component.css'
})
export class ContactoCompraComponent implements OnInit {
  formularioCompra: FormGroup;
  items: ItemCarrito[] = [];
  total: number = 0;
  procesando: boolean = false;
  pedidoConfirmado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formularioCompra = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      direccionEnvio: ['', [Validators.required, Validators.minLength(10)]],
      comentarios: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.items = this.carritoService.getItems();
    this.total = this.items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    
    if (this.items.length === 0) {
      this.toastr.warning('No hay productos en el carrito', 'Carrito vacío');
      this.router.navigate(['/productos']);
    }
  }

  confirmarPedido(): void {
    if (this.formularioCompra.valid && this.items.length > 0) {
      this.procesando = true;
      
      // Crear el pedido
      const datosContacto = {
        direccionEnvio: this.formularioCompra.value.direccionEnvio,
        telefono: this.formularioCompra.value.telefono,
        email: this.formularioCompra.value.email
      };

      const pedido = this.pedidoService.crearPedidoDesdeCarrito(this.items, this.total, datosContacto);
      
      // Limpiar el carrito
      this.carritoService.clearCart();
      
      // Mostrar mensaje de éxito
      this.pedidoConfirmado = true;
      this.toastr.success(
        `¡Pedido #${pedido.id} confirmado exitosamente!`,
        'Pedido realizado',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );

    } else {
      this.toastr.error(
        'Por favor completa todos los campos requeridos',
        'Formulario incompleto',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );
    }
  }

  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }
}
