# Toco Madera — PWA v1.0

> **Frases que vienen de raíz y se graban en el corazón.**

**Toco Madera** es una aplicación web progresiva (PWA) académica para la gestión de una empresa que transforma materia prima de madera en artículos artesanales personalizables. El proyecto fue desarrollado para una demostración local en **León, Guanajuato, México**, con interfaces de **cliente** y **administrador**.

**Versión de entrega:** `v1.0` · **Fecha:** 23 de noviembre de 2026 · **Repositorio principal:** https://github.com/CyberSpark-dev/toco-madera

> **Estado:** la instalación de la PWA desde Chrome fue confirmada durante las pruebas manuales. La aplicación está orientada a una demostración académica local; no es una pasarela de pagos reales ni un despliegue productivo. Las verificaciones finales de flujo completo y rendimiento deben documentarse antes de presentar la entrega como validada integralmente.

## Funcionalidades

### Cliente
- Consultar el catálogo de seis productos con fotografías y precios consultados en MySQL.
- Registrarse e iniciar sesión con **JWT**; nombre, correo y teléfono obligatorios.
- Gestionar su perfil («Mi cuenta») y cambiar su contraseña.
- Administrar un carrito de compras asociado a su sesión.
- Solicitar grabado artesanal personalizado cuando el artículo lo permita.
- Confirmar pedidos con pago **simulado**, al 50 % de anticipo o al 100 %.
- Consultar folio, autorización, pago, saldo y estado de entrega desde «Mis pedidos».
- Solicitar la cancelación de pedidos elegibles, sujeta a restricciones operativas; el historial se conserva y no se procesan reembolsos reales porque los pagos son ficticios.

### Administrador
- Visualizar un dashboard con gráficas de ventas por fecha, estados de pedidos y productos vendidos.
- Consultar clientes, importe histórico de compras, productos más y menos comprados, cancelaciones y rechazos; activar y desactivar cuentas **sin editar sus datos personales**.
- Gestionar productos, materiales, proveedores, compras, costos base, inventario y recetas de fabricación.
- Revisar y autorizar pedidos.
- Planificar órdenes de producción, registrar consumo de materiales y finalización de productos.
- Programar recolecciones, liquidar saldos simulados y registrar entregas.

### PWA
- Instalable desde Chrome como aplicación independiente con iconos y colores de Toco Madera.
- Manifiesto web y Service Worker de Angular en la compilación de producción.
- Caché de recursos estáticos para apertura básica sin conexión, según los recursos previamente almacenados.
- **La API Flask, los datos privados, compras y operaciones administrativas no están disponibles sin el backend y MySQL accesibles.**

## Catálogo base

1. Portateléfonos.
2. Marcos para fotografías.
3. Rodillos de cocina.
4. Repisas.
5. Portallaves.
6. Placas de escritorio.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | Angular 22, TypeScript, Angular Router, Signals, HttpClient |
| Estilos | Tailwind CSS 4, Flowbite 4 |
| Gráficas | Chart.js 4 |
| PWA | Angular Service Worker, `manifest.webmanifest`, `ngsw-config.json` |
| Backend | Python 3.11.9, Flask 3, Blueprints, JWT, Flask-SQLAlchemy |
| Base de datos | MySQL 8, PyMySQL |
| Herramientas | VS Code, Windows 11, PowerShell, Git, GitHub, MySQL Workbench |

## Arquitectura

```text
PWA / Navegador Angular (localhost:4200)
      │  HTTP JSON + Bearer JWT
      ▼
API Flask (127.0.0.1:5000, /api/v1)
      │
      ▼
MySQL 8 (toco_madera)
```

## Requisitos

- Node.js compatible con Angular 22 y npm.
- Python 3.11.9 y pip.
- MySQL Server 8 con la base de datos `toco_madera` creada.
- Chrome reciente para instalar y probar la PWA.
- Conexión local para que Angular consulte Flask y MySQL.

## Instalación local

### 1. Clonar el código

```powershell
git clone https://github.com/CyberSpark-dev/toco-madera.git
cd toco-madera
```

### 2. Configurar MySQL

Los scripts de estructura y desarrollo se encuentran en `database/`. El respaldo exportado desde MySQL Workbench para la entrega v1.0 se guardó en `database/DB_actualizada_v1.0/DB_toco_madera_app.sql` (archivo reportado el 21 de noviembre de 2026). **Antes de restaurarlo, revisa si contiene estructura, datos o ambos**; la ubicación y el tamaño del archivo por sí solos no lo demuestran. No ejecutes un archivo SQL potencialmente destructivo sobre una base con registros que quieras conservar.

Crear `backend/.env` **localmente** (no subir a GitHub):

```dotenv
SECRET_KEY=REEMPLAZAR_CON_UNA_CLAVE_ALEATORIA_LARGA
DATABASE_URL=mysql+pymysql://USUARIO:CONTRASENA@127.0.0.1:3306/toco_madera?charset=utf8mb4
```

### 3. Ejecutar Flask

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe run.py
```

API local: `http://127.0.0.1:5000/api/v1/health`. Mantener esta terminal abierta.

### 4. Ejecutar Angular en desarrollo

En otra terminal desde la raíz del repositorio:

```powershell
cd frontend
npm install
npm start
```

Abrir `http://localhost:4200`.

### 5. Compilar e instalar la PWA

En `frontend`, detener `npm start` y ejecutar:

```powershell
npx ng build --configuration production
Get-ChildItem dist -Recurse -Filter index.html
Get-ChildItem dist -Recurse -Filter ngsw.json
Get-ChildItem dist -Recurse -Filter ngsw-worker.js
```

Si `index.html` está en `dist/frontend/browser`, servir la compilación:

```powershell
npx --yes serve@14 -s dist/frontend/browser -l 4200
```

Abrir `http://localhost:4200` → Chrome → **F12 → Application**. Comprobar **Manifest** y **Service Workers**. Instalar «Toco Madera» desde el menú de Chrome cuando esté disponible. Conservar el servidor de Angular, Flask y MySQL encendidos para la demostración funcional.

## Rutas principales

| Ruta | Propósito |
| --- | --- |
| `/` | Inicio y catálogo |
| `/registro` | Alta de cliente |
| `/login` | Inicio de sesión |
| `/cliente/carrito` | Carrito |
| `/cliente/checkout` | Confirmación y pago simulado |
| `/cliente/mis-pedidos` | Historial y cancelaciones |
| `/cliente/mi-cuenta` | Datos y contraseña |
| `/admin/dashboard` | Estadísticas |
| `/admin/clientes` | Consulta y activación/desactivación de clientes |
| `/admin/pedidos` | Revisión administrativa |
| `/admin/operaciones` | Producción y entregas |

Las demás rutas administrativas están declaradas en `frontend/src/app/app.routes.ts`.

## Seguridad y límites

- JWT y autorización por roles; la protección de rutas Angular **no sustituye** el control de permisos en Flask.
- Las contraseñas se almacenan con hash, no en texto plano.
- Los datos de tarjeta y transferencia son exclusivamente **valores ficticios**; no se procesan pagos bancarios.
- No publicar `backend/.env`, tokens, claves, archivos de entornos virtuales ni datos personales reales.
- La baja de clientes es lógica para preservar el historial comercial.
- Las cancelaciones conservan el historial y están limitadas por el estado operativo del pedido.
- El Service Worker no debe cachear endpoints privados `/api/v1/`.
- La demostración local funciona sin acceso a internet si todos los servicios locales están disponibles, pero la consulta dinámica a MySQL **no es una funcionalidad offline autónoma**.

## Base de datos y respaldos — v1.0

Se exportó manualmente desde **MySQL Workbench** un archivo SQL actualizado y se colocó en:

```text
toco-madera/
└── database/
    └── DB_actualizada_v1.0/
        └── DB_toco_madera_app.sql
```

**Fecha de exportación informada:** 21 de noviembre de 2026. **Tamaño aproximado visible:** 58 KB. **Estado:** archivo presente según captura de Windows, pero su contenido y capacidad de restauración no están validados en este README.

### Comprobar el contenido del respaldo

Abre el SQL en VS Code y verifica si contiene sentencias como `CREATE TABLE` (estructura), `INSERT INTO` (datos), `CREATE TRIGGER` (disparadores) y `CREATE PROCEDURE` (procedimientos). La presencia de datos históricos debe verificarse directamente en el archivo o mediante una restauración de prueba.

```powershell
# Desde la raíz de toco-madera
Get-Item 'database/DB_actualizada_v1.0/DB_toco_madera_app.sql'
Select-String -Path 'database/DB_actualizada_v1.0/DB_toco_madera_app.sql' -Pattern 'CREATE TABLE|INSERT INTO|CREATE TRIGGER|CREATE PROCEDURE' | Select-Object -First 20
```

Para confirmar que el archivo es restaurable, impórtalo **primero a una base de prueba aislada** (o utiliza un servidor de pruebas) y compara tablas y registros. Evita restaurarlo directamente sobre la base de la exposición sin respaldo previo.

### Política de publicación en GitHub

Un volcado con `INSERT INTO` puede contener nombres, correos, teléfonos, hashes de contraseñas, pedidos y otros datos. **No lo publiques automáticamente**, aunque las cuentas sean de demostración. Antes de usar `git add .`:

1. Conserva una copia completa del volcado en un lugar privado fuera del repositorio.
2. Si el archivo contiene datos personales o de autenticación, excluye `database/DB_actualizada_v1.0/DB_toco_madera_app.sql` en `.gitignore`.
3. Genera una exportación de **solo estructura** para el repositorio (Workbench: *Data Export → Dump Structure Only*), por ejemplo `database/toco_madera_v1.0_schema.sql`. Inspecciona el SQL por si los procedimientos, vistas o comentarios contienen secretos.
4. Si quieres que GitHub incluya un conjunto de datos demostrativos, utiliza un script `seed` preparado con registros inventados y contraseñas de prueba no reutilizadas.

### Recuperación de la base de datos

La base usada en desarrollo se llama `toco_madera`. Para migrar a otro equipo, primero crea/configura MySQL 8, restaura un esquema verificado y carga datos de ejemplo o un respaldo privado **solo después de comprobar que sea seguro y compatible**. El repositorio no debe depender de tener registros personales históricos públicos.

## Validación antes de la exposición

- [ ] `npm install` y `ng build --configuration production` terminan correctamente.
- [ ] Chrome muestra el manifiesto y el Service Worker activado.
- [ ] La PWA se instala y se abre desde el escritorio.
- [ ] Inicio, catálogo y seis imágenes se muestran.
- [ ] Registro, login, «Mi cuenta» y carrito funcionan.
- [ ] Checkout simulado, cancelación e historial funcionan.
- [ ] Administración de clientes, pedidos, inventario, producción y entregas funcionan.
- [ ] Gráficas consultan los datos actuales de MySQL.
- [ ] Se inspeccionó `database/DB_actualizada_v1.0/DB_toco_madera_app.sql` y se probó su restauración de forma aislada.
- [ ] Se verificó que no haya datos sensibles incluidos en GitHub.
- [ ] Se verificó el último commit y tag en GitHub.

## Publicación y versión

- **Versión:** `1.0.0` (entrega académica).
- **Commit sugerido:** `PWA Toco Madera v1.0`.
- **Tag sugerido:** `v1.0.0` (crearlo solo después de confirmar el push).
- **Repositorio:** https://github.com/CyberSpark-dev/toco-madera

## Autor

**Angel Torres**
**Braulio Ríos**
**Arturo Landeros**
**Emiliano Barajas**
---

*Nota de verificación: este README integra el estado descrito en el proyecto y las últimas etapas implementadas durante la conversación. No constituye una certificación de pruebas automatizadas ni de despliegue en producción.*
