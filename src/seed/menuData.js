// Datos iniciales para poblar la base de datos la primera vez (npm run seed).
// Una vez en la base de datos, el menú se administra ahí, no aquí.

export const categories = [
  { key: 'picoteo', name: 'Picoteo', icon: '🍤', order: 1 },
  { key: 'papas-fritas', name: 'Papas Fritas', icon: '🍟', order: 2 },
  { key: 'hamburguesas', name: 'Hamburguesas', icon: '🍔', order: 3 },
  { key: 'arma-tu-hamburguesa', name: 'Arma tu hamburguesa', icon: '🧅', order: 4 },
  { key: 'costillas-pechuga', name: 'Costillas BBQ y Pechuga', icon: '🍖', order: 5 },
  { key: 'bebidas', name: 'Bebidas', icon: '🥤', order: 6 },
  { key: 'churrasco', name: 'Churrasco de Fuente', icon: '🥪', order: 7 },
]

export const products = [
  // Picoteo
  { category: 'picoteo', name: 'Chicken fingers 6 U', price: 4390 },
  { category: 'picoteo', name: 'Empanadas de queso 5 U', description: '4 unidades', price: 3990 },
  { category: 'picoteo', name: 'Porción aros de cebolla (10U)', description: '10 unidades', price: 4990 },
  { category: 'picoteo', name: 'Pollo apanado 250GR', price: 5990 },

  // Papas Fritas
  { category: 'papas-fritas', name: 'Papas chicas', price: 2500 },
  { category: 'papas-fritas', name: 'Vaso ranchero cheddar', description: 'Papas fritas, salsa queso cheddar y tocino', price: 4190 },
  { category: 'papas-fritas', name: 'Vaso ranchero supremas', description: 'Papas fritas, salsa de la casa, champiñones y tomate', price: 4290 },
  { category: 'papas-fritas', name: 'Papas medianas', price: 3990 },
  { category: 'papas-fritas', name: 'Papas grandes', price: 5990 },
  { category: 'papas-fritas', name: 'Tarro ranchero cheddar', description: 'Papas fritas, salsa de queso cheddar y tocino', price: 9990 },
  { category: 'papas-fritas', name: 'Tarro ranchero supremas', description: 'Papas fritas, salsa de la casa, tomate y champiñón', price: 9990 },
  { category: 'papas-fritas', name: 'Vaso wild mushroom shiitake', description: 'Papas fritas cubiertas de nuestra crema con cebolla caramelizada y champiñones shiitake', price: 4590 },
  { category: 'papas-fritas', name: 'Tarro wild mushroom shiitake', description: 'Papas fritas cubiertas de nuestra crema con cebolla caramelizada y champiñones shiitake', price: 10290 },

  // Hamburguesas
  { category: 'hamburguesas', name: 'Cheese burger + papas fritas y bebida', description: 'Hamburguesa, queso cheddar, salsa de la casa', price: 6590 },
  { category: 'hamburguesas', name: 'Cuarto libre + papas fritas y bebida', description: 'Pan brioche, hamburguesa, queso cheddar, pepinillos, cebolla, ketchup y mostaza', price: 7190 },
  { category: 'hamburguesas', name: 'Tennessee + papas fritas y bebida', description: 'Pan brioche, hamburguesa, lechuga, tomate, pepinillos, queso cheddar, cebolla morada y salsa de la casa', price: 8390 },
  { category: 'hamburguesas', name: 'Arkansas + papas fritas y bebida', description: 'Pan brioche, hamburguesa, queso cheddar, cebolla apanada, champiñón, BBQ y salsa de la casa', price: 8990 },
  { category: 'hamburguesas', name: 'Indiana + papas fritas y bebida', description: 'Pan brioche, hamburguesa, queso cheddar, tocino, champiñón, cebolla caramelizada, BBQ y salsa ranch', price: 9690 },
  { category: 'hamburguesas', name: 'Denver + papas fritas y bebida', description: 'Pan brioche, hamburguesa, queso cheddar, lechuga, tocino, BBQ, pepinillos, cebolla morada y salsa ranch', price: 9190 },
  { category: 'hamburguesas', name: 'Buffalo + papas fritas y bebida', description: 'Pan brioche, hamburguesa, mechada, salsa ranch, salsa de la casa, tocino, queso cheddar, pepinillos', price: 10490 },
  { category: 'hamburguesas', name: 'The Crunchy Onion + papas fritas + bebida', description: 'Hamburguesa jugosa, queso cheddar, pepinillos crujientes, lechuga y aros de cebolla', price: 9290 },
  { category: 'hamburguesas', name: 'Oklahoma + papas fritas + bebida', description: 'Pan de papa, hamburguesa, cebolla grillada, queso cheddar y salsa Emmy', price: 7890 },
  { category: 'hamburguesas', name: 'Big Okla + papas fritas + bebida', description: "Doble hamburguesa, lechuga, cebolla blanca, pepinillos, pan Not Martin's y salsa de la casa", price: 9590 },
  { category: 'hamburguesas', name: 'Mr Fresh Chicken + papas fritas + bebida', description: 'Crujiente pollo apanado, tomate, lechuga, pepinillos, salsa de la casa y salsa ranch', price: 7690 },
  { category: 'hamburguesas', name: 'Mr Bacon Chicken + papas + bebida', description: 'Crujiente pollo apanado, queso cheddar, cebolla caramelizada, tocino, BBQ y salsa ranch', price: 8290 },
  { category: 'hamburguesas', name: 'Infierno del Oeste', description: 'Carne jugosa, cheddar, cebolla caramelizada y salsa jalapeño', price: 7900 },
  { category: 'hamburguesas', name: 'Blue Cheese + papas + bebida', description: 'Pan de papa, hamburguesa, cheddar, salsa queso azul, cebolla crispy', price: 8490 },
  { category: 'hamburguesas', name: 'Double Double Animal Style + papas + bebida', description: 'Doble hamburguesa, queso cheddar, cebolla caramelizada, tomate, lechuga, pepinillos, salsa animal style', price: 9990 },

  // Arma tu hamburguesa
  { category: 'arma-tu-hamburguesa', name: 'Base hamburguesa y queso cheddar + papas fritas + bebida', description: 'Pan brioche, hamburguesa y queso cheddar', price: 5590 },
  { category: 'arma-tu-hamburguesa', name: 'Lechuga', price: 690 },
  { category: 'arma-tu-hamburguesa', name: 'Tomate', price: 690 },
  { category: 'arma-tu-hamburguesa', name: 'Cebolla cruda', price: 690 },
  { category: 'arma-tu-hamburguesa', name: 'Cebolla caramelizada', price: 790 },
  { category: 'arma-tu-hamburguesa', name: 'Pepinillos', price: 750 },
  { category: 'arma-tu-hamburguesa', name: 'BBQ', price: 550 },
  { category: 'arma-tu-hamburguesa', name: 'Salsa de la casa', price: 550 },
  { category: 'arma-tu-hamburguesa', name: 'Salsa ranch', price: 550 },
  { category: 'arma-tu-hamburguesa', name: 'Tocino', price: 1590 },
  { category: 'arma-tu-hamburguesa', name: 'Champiñón', price: 1590 },
  { category: 'arma-tu-hamburguesa', name: 'Mechada', price: 1590 },
  { category: 'arma-tu-hamburguesa', name: 'Queso cheddar', price: 690 },
  { category: 'arma-tu-hamburguesa', name: 'Salsa Emmy', price: 750 },
  { category: 'arma-tu-hamburguesa', name: 'Aros cebolla 3U', price: 1200 },
  { category: 'arma-tu-hamburguesa', name: 'Cambio a Not Burger', price: 1490 },

  // Costillas BBQ y Pechuga apanada
  { category: 'costillas-pechuga', name: 'Menú kids', description: 'Chicken fingers (6U) + papas fritas y bebida', price: 6490 },
  { category: 'costillas-pechuga', name: 'Pechuga apanada', price: 21990 },
  { category: 'costillas-pechuga', name: 'Pechuga apanada + 1 acompañamiento + bebida', description: 'Pechuga apanada + papas fritas + bebida pequeña', price: 10990 },
  { category: 'costillas-pechuga', name: 'Pechuga apanada 2 a 3 personas + 2 acompañamientos', description: 'Pechuga apanada + 2 acompañamientos a elección', price: 23990 },
  { category: 'costillas-pechuga', name: 'Costillar BBQ', description: 'Costillar ahumado BBQ', price: 21990 },
  { category: 'costillas-pechuga', name: 'Costillar BBQ + 1 acompañamiento + bebida', description: 'Costillar ahumado BBQ + papas fritas + bebida pequeña', price: 10990 },
  { category: 'costillas-pechuga', name: 'Costillas BBQ 2 a 3 personas + 2 acompañamientos', description: 'Costillar ahumado BBQ + 2 acompañamientos a elección', price: 23990 },

  // Bebidas
  { category: 'bebidas', name: 'Coca-Cola 220 CC', price: 1500 },
  { category: 'bebidas', name: 'Fanta 220 CC', price: 1500 },

  // Churrasco de fuente
  { category: 'churrasco', name: 'Barros Luco de fuente + bebida', description: '200 gr asiento, marraqueta', price: 9990 },
  { category: 'churrasco', name: 'Chacarero de fuente + bebida', description: '200 gr churrasco asiento, porotos verdes, tomate, ají, mayonesa', price: 10990 },
  { category: 'churrasco', name: 'Italiano de fuente + bebida', description: '200 gr asiento, palta natural, tomate, marraqueta', price: 10590 },
]
