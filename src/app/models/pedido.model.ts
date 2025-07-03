export interface Pedido {
  id?: number;
  fecha: Date;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  usuarioId?: number;
  direccionEnvio?: string;
  telefono?: string;
  email?: string;
}

export interface ItemPedido {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  imagen_url?: string;
}

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO',
  EN_PREPARACION = 'EN_PREPARACION',
  ENVIADO = 'ENVIADO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO'
} 