import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  totalCarrito: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.productoService.getCarrito().subscribe(carrito => {
      this.carrito = carrito;
      this.calcularTotal();
    });
  }

  vaciarCarrito() {
    this.productoService.vaciarCarrito().subscribe(() => {
      this.cargarCarrito();
    });
  }

  calcularTotal() {
    this.totalCarrito = this.carrito.reduce((acc, prod) => acc + prod.precio, 0);
  }
}
