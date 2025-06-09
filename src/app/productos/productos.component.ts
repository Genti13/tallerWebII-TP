import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    standalone: false
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  agregarAlCarrito(id: number) {
    this.productoService.agregarACarrito(id).subscribe(() => {
      alert('Producto agregado al carrito');
    });
  }
}
