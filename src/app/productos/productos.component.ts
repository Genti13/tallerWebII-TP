import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../models/producto.model';
import { CarritoService } from '../services_carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
     animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'none' })),
      ])
    ])
  ]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  filtro: string = '';

  constructor(
  private productoService: ProductoService,
  private carritoService: CarritoService,
  private toastr: ToastrService
) {}
  
  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      console.log('Productos recibidos:', productos); //debug
      this.productos = productos;
    });
  }

  agregarAlCarrito(producto: Producto): void {
  const cantidadStr = window.prompt(`¿Cuántos "${producto.nombre}" deseas agregar al carrito?`, '1');
  const cantidad = Number(cantidadStr);

  if (!cantidadStr || isNaN(cantidad) || cantidad < 1) {
    this.toastr.error('Cantidad inválida', 'Error', {
      timeOut: 2000,
      positionClass: 'toast-top-right',
      toastClass: 'ngx-toastr custom-toastr'
    });
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    this.carritoService.addItem(producto);
  }

  this.toastr.success(
    `¡${producto.nombre} x${cantidad} agregado(s) al carrito!`,
    'Producto agregado',
    {
      timeOut: 2000,
      positionClass: 'toast-top-right',
      toastClass: 'ngx-toastr custom-toastr'
    }
  );
}

  productosFiltrados(): Producto[] {
    if (!this.filtro.trim()) return this.productos;
    const filtroLower = this.filtro.toLowerCase();
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(filtroLower) ||
      p.descripcion.toLowerCase().includes(filtroLower) ||
      p.clasificacion.toLowerCase().includes(filtroLower)
    );
  }
}
