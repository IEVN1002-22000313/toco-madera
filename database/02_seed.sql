-- Datos de catalogo DEMOSTRATIVOS, no compras ni stock reales.
-- Ejecutar UNA VEZ inmediatamente despues de 01_schema.sql.
USE toco_madera;
INSERT INTO roles (id_rol,nombre,descripcion) VALUES
 (1,'ADMIN','Gestiona productos, proveedores, compras y produccion'),
 (2,'CLIENTE','Compra y consulta sus pedidos');
INSERT INTO unidades_medida (id_unidad,codigo,nombre) VALUES
 (1,'M2','Metro cuadrado'),(2,'G','Gramo'),(3,'ML','Mililitro'),
 (4,'PZA','Pieza'),(5,'MIN','Minuto');
INSERT INTO categorias(id_categoria,nombre) VALUES
 (1,'Escritorio'),(2,'Decoracion'),(3,'Cocina'),(4,'Organizacion');
INSERT INTO materiales(id_material,sku,nombre,descripcion,id_unidad,stock_minimo) VALUES
 (1,'PINO','Madera de pino cepillada','Medida de costo y consumo por superficie',1,0.50),
 (2,'TRIPLAY','Triplay 12 mm','Medida por superficie',1,0.50),
 (3,'PEGAMENTO','Adhesivo para madera','Consumo por gramo',2,100),
 (4,'BARNIZ','Barniz para interiores','NO aplicar en rodillos para cocina',3,150),
 (5,'LIJA','Lija','Unidades equivalentes consumidas',4,10),
 (6,'GANCHO','Gancho metalico','Portallaves',4,15),
 (7,'TORNILLO','Juego tornillo y taquete','Herrajes para montaje',4,15),
 (8,'PROTECTOR_MARCO','Protector transparente para marco','Lamina de proteccion',4,5),
 (9,'EMPAQUE','Empaque kraft','Bolsa/caja con etiqueta',4,10),
 (10,'RODILLO_BASE','Cuerpo rodillo madera apta para alimentos','Preformado; validar proveedor',4,3),
 (11,'ACEITE_APTO','Aceite acabado apto para contacto alimentario','Exige ficha tecnica del proveedor',3,80),
 (12,'PIRO','Consumible de pirograbado','Desgaste/electricidad equivalente',4,10);
INSERT INTO productos (id_producto,id_categoria,sku,nombre,descripcion,precio_lista,permite_grabado,max_caracteres_grabado) VALUES
 (1,1,'TM-PT-01','Portatelefonos','Soporte pequeno de madera con nombre o frase',190,TRUE,40),
 (2,2,'TM-MF-01','Marco para fotografias','Marco de mesa personalizable',315,TRUE,45),
 (3,3,'TM-RC-01','Rodillo de cocina','Grabado solo en asas; acabado apto para alimentos',330,TRUE,25),
 (4,2,'TM-RP-01','Repisa pequena','Repisa decorativa con grabado frontal',450,TRUE,40),
 (5,4,'TM-PL-01','Portallaves','Base de madera con ganchos y dedicatoria',350,TRUE,45),
 (6,1,'TM-PE-01','Placa de escritorio','Placa de nombre o frase para escritorio',165,TRUE,50);
INSERT INTO recetas (id_receta,id_producto,version,vigente,minutos_fabricacion,minutos_grabado,costo_hora_mano_obra,costo_indirecto_unitario,observaciones) VALUES
 (1,1,1,TRUE,45,20,75,8,'Tiempos supuestos sujetos a prototipo'),
 (2,2,1,TRUE,75,25,75,10,'Tiempos supuestos sujetos a prototipo'),
 (3,3,1,TRUE,55,20,75,10,'No usar barniz interior en superficie alimentaria'),
 (4,4,1,TRUE,100,30,75,15,'Validar herrajes y capacidad de carga'),
 (5,5,1,TRUE,75,30,75,12,'Tiempos supuestos sujetos a prototipo'),
 (6,6,1,TRUE,35,20,75,7,'Tiempos supuestos sujetos a prototipo');
-- Recetas DEMOSTRATIVAS, no equivalen a costos finales.
INSERT INTO receta_materiales (id_receta,id_material,cantidad) VALUES
 (1,1,0.0650),(1,3,8),(1,4,12),(1,5,0.25),(1,9,1),(1,12,1),
 (2,1,0.1300),(2,3,15),(2,4,20),(2,5,0.50),(2,8,1),(2,9,1),(2,12,1),
 (3,10,1),(3,11,8),(3,5,0.25),(3,9,1),(3,12,1),
 (4,1,0.2800),(4,3,20),(4,4,35),(4,5,1),(4,7,2),(4,9,1),(4,12,1),
 (5,1,0.1800),(5,3,10),(5,4,25),(5,5,0.50),(5,6,3),(5,7,2),(5,9,1),(5,12,1),
 (6,1,0.0450),(6,3,5),(6,4,10),(6,5,0.25),(6,9,1),(6,12,1);
-- Precios historicos referenciales (del material previo de planeacion).
-- NO indican proveedor contratado, compras realizadas ni stock.
INSERT INTO cotizaciones_material(id_material,id_proveedor,fecha,presentacion,cantidad_base,precio_presentacion,clasificacion,url_fuente,observaciones) VALUES
 (1,NULL,'2026-11-11','Tabla pino cepillada 1.9x14x244 cm',0.3416,196,'PUBLICADA','https://www.homedepot.com.mx/p/tabla-de-madera-de-pino-dimensionada-1-x-6-x-8-pies-para-construccion-selecta-102103','Precio historico referencial; confirmar sucursal'),
 (2,NULL,'2026-11-11','Hoja triplay BC 1.22x2.44 m',2.9768,639,'PUBLICADA','https://www.homedepot.com.mx/es-es/p/triplay-lijado-bc-12-mm-122-x-244-m-para-construccion-545757-545757','Precio historico referencial; confirmar sucursal'),
 (3,NULL,'2026-11-11','Pegamento 500 g',500,123,'PUBLICADA','https://www.homedepot.com.mx/p/resistol-resistol-850-pegamento-profesional-para-madera-blanco-500-gr-1857127-899396','Precio historico referencial'),
 (4,NULL,'2026-11-11','Barniz interior 1000 ml',1000,275,'PUBLICADA','https://www.homedepot.com.mx/p/sayer-lack-barniz-nitrocelulosa-transparente-para-madera-semi-mate-secado-rapido-1-l-nl-074330-321849','No usar para rodillo'),
 (5,NULL,'2026-11-11','Lija equivalente',1,4,'ESTIMADA',NULL,'Supuesto sin cotizacion'),
 (6,NULL,'2026-11-11','Gancho metalico',1,5,'ESTIMADA',NULL,'Supuesto sin cotizacion'),
 (7,NULL,'2026-11-11','Juego tornillo y taquete',1,3,'ESTIMADA',NULL,'Supuesto sin cotizacion'),
 (8,NULL,'2026-11-11','Protector marco',1,14,'ESTIMADA',NULL,'Supuesto sin cotizacion'),
 (9,NULL,'2026-11-11','Empaque',1,8,'ESTIMADA',NULL,'Supuesto sin cotizacion'),
 (10,NULL,'2026-11-11','Rodillo base',1,65,'ESTIMADA',NULL,'Validar aptitud para alimentos'),
 (11,NULL,'2026-11-11','Acabado alimentario ml',1,1.4,'ESTIMADA',NULL,'Validar ficha tecnica'),
 (12,NULL,'2026-11-11','Pirograbado consumible',1,3,'ESTIMADA',NULL,'Costo equivalente propuesto');

