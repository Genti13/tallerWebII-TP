import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../models/producto.model';
import { CarritoService } from '../services_carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
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
  this.carritoService.addItem(producto);
  this.toastr.success(
    `¡${producto.nombre} agregado al carrito!`,
    'Producto agregado',
    {
      timeOut: 2000,
      positionClass: 'toast-top-right',
      toastClass: 'ngx-toastr custom-toastr'
    }
  );
}
}
