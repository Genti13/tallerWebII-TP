import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/ProductService/producto.service';
import { Producto } from '../models/producto.model';
import { CarritoService, Filtros } from '../servicios/CartService/carrito.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { signal, effect } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';



@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, MultiSelectModule],
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
  ordenPrecio: string = '';
  categoria: string = '';
  priceMin = signal(0);
  priceMax = signal(0);
  filtros: Filtros = null;


  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.productoService.getProductos().subscribe(productos => {
      console.log('Productos recibidos:', productos); //debug
      this.productos = (productos || []).filter(p => !!p).map(p => ({
        ...p,
        cantidadSeleccionada: p.cantidadSeleccionada ?? 1
      }));
    });

    this.filtros = this.carritoService.getFilters();

    console.log(this.filtros);
    

    this.filtro = this.filtros.filtro_texto;
    this.categoria = this.filtros.filtro_categoria;
    this.ordenPrecio = this.filtros.orden;
    this.priceMin.set(this.filtros.filtro_min);
    this.priceMax.set(this.filtros.filtro_max);
  }

  ajustePrecioEffect = effect(() => {
    const min = this.priceMin();
    const max = this.priceMax();
    if (min > max) this.priceMax.set(min);
    if (max < min) this.priceMin.set(max);
  });

  /* agregarAlCarrito(producto: Producto): void {
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
 }*/

  resetPriceRange() {
    this.priceMin.set(0);
    this.priceMax.set(0);
  }

  agregarAlCarrito(producto: Producto): void {
    const cantidad = producto.cantidadSeleccionada || 1;

    if (isNaN(cantidad) || cantidad < 1) {
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
    const filtro = this.filtro.trim().toLowerCase();
    const categoria = this.categoria.trim().toLowerCase();
    const min = this.priceMin() ?? 0;
    const max = this.priceMax();

    if (!filtro && !categoria && !max) {
      return this.ordenarPorPrecio(this.productos);
    }

    const filtrados = this.productos.filter(p => {
      const nombre = p.nombre.toLowerCase();
      const descripcion = p.descripcion.toLowerCase();
      const clasificacion = p.clasificacion.toLowerCase();
      const precio = p.precio ?? 0;

      const coincideTexto =
        nombre.includes(filtro) ||
        descripcion.includes(filtro) ||
        clasificacion.includes(filtro);

      const coincideCategoria = clasificacion.includes(categoria);
      const coincidePrecio = (precio >= min && precio <= max);

      this.filtros.filtro_texto = this.filtro;
      this.filtros.filtro_categoria = this.categoria;
      this.filtros.filtro_min = this.priceMin();
      this.filtros.filtro_max = this.priceMax();
      this.filtros.orden = this.ordenPrecio;
     

      return (filtro ? coincideTexto : true)
        && (categoria ? coincideCategoria : true)
        && (max != 0 ? coincidePrecio : true);
    });

    return this.ordenarPorPrecio(filtrados);
  }

  ordenarPorPrecio(productos: Producto[]): Producto[] {
    if (this.ordenPrecio === 'menor') {
      return productos.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenPrecio === 'mayor') {
      return productos.sort((a, b) => b.precio - a.precio);
    }
    return productos;
  }

  isCantidadInvalida(valor: any): boolean {
    return valor === null || valor === undefined || valor <= 0 || isNaN(Number(valor));
  }

}
