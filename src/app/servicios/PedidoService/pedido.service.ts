import { Injectable } from '@angular/core';
import { Pedido, ItemPedido, EstadoPedido } from '../../models/pedido.model';
import { ItemCarrito } from '../CartService/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly PEDIDOS_KEY = 'pedidos_historial';

  constructor() {}

  // Crear un nuevo pedido desde el carrito
  crearPedidoDesdeCarrito(
    items: ItemCarrito[], 
    total: number, 
    datosContacto?: { direccionEnvio?: string; telefono?: string; email?: string }
  ): Pedido {
    const pedido: Pedido = {
      id: this.generarId(),
      fecha: new Date(),
      items: this.convertirItemsCarrito(items),
      total: total,
      estado: EstadoPedido.PENDIENTE,
      direccionEnvio: datosContacto?.direccionEnvio || '',
      telefono: datosContacto?.telefono || '',
      email: datosContacto?.email || ''
    };

    this.guardarPedido(pedido);
    return pedido;
  }

  // Obtener todos los pedidos
  getPedidos(): Pedido[] {
    const pedidos = localStorage.getItem(this.PEDIDOS_KEY);
    if (pedidos) {
      const pedidosParsed = JSON.parse(pedidos);
      return pedidosParsed.map((pedido: any) => ({
        ...pedido,
        fecha: new Date(pedido.fecha)
      }));
    }
    return [];
  }

  // Obtener pedido por ID
  getPedidoById(id: number): Pedido | undefined {
    const pedidos = this.getPedidos();
    return pedidos.find(pedido => pedido.id === id);
  }

  // Actualizar estado de un pedido
  actualizarEstadoPedido(id: number, nuevoEstado: EstadoPedido): void {
    const pedidos = this.getPedidos();
    const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);
    
    if (pedidoIndex !== -1) {
      pedidos[pedidoIndex].estado = nuevoEstado;
      this.guardarPedidos(pedidos);
    }
  }

  // Cancelar pedido
  cancelarPedido(id: number): void {
    this.actualizarEstadoPedido(id, EstadoPedido.CANCELADO);
  }

  // Obtener pedidos por estado
  getPedidosPorEstado(estado: EstadoPedido): Pedido[] {
    return this.getPedidos().filter(pedido => pedido.estado === estado);
  }

  // Obtener pedidos recientes (últimos 5)
  getPedidosRecientes(): Pedido[] {
    const pedidos = this.getPedidos();
    return pedidos
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 5);
  }

  // Eliminar pedido (solo para administración)
  eliminarPedido(id: number): void {
    const pedidos = this.getPedidos();
    const pedidosFiltrados = pedidos.filter(pedido => pedido.id !== id);
    this.guardarPedidos(pedidosFiltrados);
  }

  // Métodos privados
  private convertirItemsCarrito(items: ItemCarrito[]): ItemPedido[] {
    return items.map(item => ({
      productoId: item.producto.id || 0,
      nombre: item.producto.nombre,
      descripcion: item.producto.descripcion,
      precio: item.producto.precio,
      cantidad: item.cantidad,
      subtotal: item.producto.precio * item.cantidad,
      imagen_url: item.producto.imagen_url
    }));
  }

  private generarId(): number {
    const pedidos = this.getPedidos();
    if (pedidos.length === 0) return 1;
    return Math.max(...pedidos.map(p => p.id || 0)) + 1;
  }

  private guardarPedido(pedido: Pedido): void {
    const pedidos = this.getPedidos();
    pedidos.push(pedido);
    this.guardarPedidos(pedidos);
  }

  private guardarPedidos(pedidos: Pedido[]): void {
    localStorage.setItem(this.PEDIDOS_KEY, JSON.stringify(pedidos));
  }

  // Métodos de utilidad
  getEstadoColor(estado: EstadoPedido): string {
    switch (estado) {
      case EstadoPedido.PENDIENTE:
        return '#ffc107'; // Amarillo
      case EstadoPedido.CONFIRMADO:
        return '#17a2b8'; // Azul
      case EstadoPedido.EN_PREPARACION:
        return '#fd7e14'; // Naranja
      case EstadoPedido.ENVIADO:
        return '#007bff'; // Azul primario
      case EstadoPedido.ENTREGADO:
        return '#28a745'; // Verde
      case EstadoPedido.CANCELADO:
        return '#dc3545'; // Rojo
      default:
        return '#6c757d'; // Gris
    }
  }

  getEstadoTexto(estado: EstadoPedido): string {
    switch (estado) {
      case EstadoPedido.PENDIENTE:
        return 'Pendiente';
      case EstadoPedido.CONFIRMADO:
        return 'Confirmado';
      case EstadoPedido.EN_PREPARACION:
        return 'En Preparación';
      case EstadoPedido.ENVIADO:
        return 'Enviado';
      case EstadoPedido.ENTREGADO:
        return 'Entregado';
      case EstadoPedido.CANCELADO:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }
} 