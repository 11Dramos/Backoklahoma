# Oklahoma Burgers & Ribs — Backend

API REST + tiempo real (Socket.IO) para el sistema de pedidos. Node.js + Express + MongoDB (Mongoose).

## Configuración

1. Copia `.env.example` a `.env` y completa `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas.
2. Instala dependencias e inicializa la base de datos con el menú:

```bash
npm install
npm run seed   # carga categorías y productos iniciales en la base de datos
npm run dev    # levanta el servidor en http://localhost:4000
```

## Endpoints

| Método | Ruta                      | Descripción                                                   |
| ------ | ------------------------- | -------------------------------------------------------------- |
| GET    | `/api/health`             | Chequeo de que el servidor está vivo                           |
| GET    | `/api/menu`                | Categorías y productos disponibles                             |
| POST   | `/api/orders`              | Crea un pedido (recalcula precios en el servidor, no confía en el cliente) |
| GET    | `/api/orders`              | Lista todos los pedidos (para el panel)                        |
| PATCH  | `/api/orders/:id/status`   | Cambia el estado de un pedido                                  |
| POST   | `/api/delivery/quote`      | Cotización de delivery — **simulada**, pendiente de Uber Direct real |
| POST   | `/api/payments/simulate`   | Simula la aprobación de un pago — pendiente de Webpay/Mercado Pago real |

## Tiempo real

El servidor emite eventos por Socket.IO para que un panel de administración se actualice solo:

- `order:new` — se emite al crear un pedido
- `order:updated` — se emite al cambiar el estado de un pedido

## Pendiente

- Autenticación para el panel de administración.
- Integración real con Uber Direct (reemplaza `routes/delivery.js`).
- Integración real con Webpay/Mercado Pago (reemplaza `routes/payments.js`).
