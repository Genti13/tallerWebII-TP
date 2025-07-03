import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../servicios/PedidoService/pedido.service';
import { Pedido, EstadoPedido } from '../models/pedido.model';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'none' })),
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  filtroEstado: EstadoPedido | 'TODOS' = 'TODOS';
  estados = Object.values(EstadoPedido);
  mostrarDetalles: { [key: number]: boolean } = {};

  constructor(
    private pedidoService: PedidoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidos = this.pedidoService.getPedidos();
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    if (this.filtroEstado === 'TODOS') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(
        pedido => pedido.estado === this.filtroEstado
      );
    }
  }

  cambiarFiltro(estado: EstadoPedido | 'TODOS'): void {
    this.filtroEstado = estado;
    this.aplicarFiltro();
  }

  toggleDetalles(pedidoId: number): void {
    this.mostrarDetalles[pedidoId] = !this.mostrarDetalles[pedidoId];
  }

  cancelarPedido(pedido: Pedido): void {
    if (pedido.estado === EstadoPedido.PENDIENTE) {
      this.pedidoService.cancelarPedido(pedido.id!);
      this.cargarPedidos();
      this.toastr.success(
        'Pedido cancelado exitosamente',
        'Pedido #' + pedido.id,
        {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );
    } else {
      this.toastr.warning(
        'Solo se pueden cancelar pedidos pendientes',
        'No se puede cancelar',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toastr'
        }
      );
    }
  }

  getEstadoColor(estado: EstadoPedido): string {
    return this.pedidoService.getEstadoColor(estado);
  }

  getEstadoTexto(estado: EstadoPedido): string {
    return this.pedidoService.getEstadoTexto(estado);
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTotalItems(pedido: Pedido): number {
    return pedido.items.reduce((total, item) => total + item.cantidad, 0);
  }

  puedeCancelar(pedido: Pedido): boolean {
    return pedido.estado === EstadoPedido.PENDIENTE;
  }
} 