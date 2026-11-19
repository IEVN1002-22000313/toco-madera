# Toco Madera

> **«Frases que vienen de raíz y se graban en el corazón.»**

**Toco Madera** es una aplicación web progresiva (PWA) académica orientada a una empresa de transformación artesanal de madera en León, Guanajuato, México. Permite ofrecer productos de madera personalizables a clientes y centralizar, mediante un panel protegido, las operaciones administrativas del negocio.

**Estado de desarrollo:** Etapa **3.15** terminada y probada funcionalmente en entorno local. La aplicación está **en desarrollo** y no debe considerarse lista para producción.

## 1. Objetivo y alcance

El sistema modela la compra de materias primas, su transformación en artículos de madera y su venta al cliente. Incluye una interfaz pública y una interfaz administrativa. El proyecto está desarrollado por un equipo de cuatro integrantes, con una planificación académica de diez días de implementación y pruebas.

La plataforma contempla catálogo, registro e inicio de sesión, personalización por grabado, carrito, pedidos, simulación de pagos, proveedores, compras, materiales, inventario y producción. **No todos estos módulos están terminados:** consulta la sección «Estado de los módulos».

### Productos iniciales

1. Portateléfonos.
2. Marcos fotográficos.
3. Rodillos de cocina.
4. Repisas.
5. Portallaves.
6. Placas de escritorio.

La aplicación admite la administración de registros adicionales mediante el CRUD; los seis anteriores son el catálogo base del proyecto.

## 2. Identidad visual

| Elemento | Valor |
|---|---|
| Nombre | Toco Madera |
| Eslogan | Frases que vienen de raíz y se graban en el corazón. |
| Nogal | `#4B2E1F` |
| Terracota | `#A65A2E` |
| Crema | `#F9E9D5` |
| Verde salvia | `#718063` |
| Tipografías | Poppins e Inter (Google Fonts, con fuentes alternativas CSS) |

La interfaz se desarrolla con clases de **Tailwind CSS 4** y componentes/estilos compatibles con **Flowbite 4**.

## 3. Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | Angular 22.2.0, TypeScript, componentes standalone, Angular Router, Signals, HttpClient |
| Estilos | Tailwind CSS 4, Flowbite 4, CSS |
| Visualización | Chart.js |
| Backend | Python 3.11.9, Flask, Blueprints, patrón Application Factory |
| Persistencia | MySQL 8, Flask-SQLAlchemy, PyMySQL |
| Seguridad | JWT mediante Flask-JWT-Extended, roles `ADMIN` y `CLIENTE`, guard Angular, interceptor HTTP y decorador backend `@admin_required` |
| Desarrollo | Visual Studio Code, PowerShell, MySQL Workbench, Git y GitHub |

**Decisión de alcance:** esta versión no utiliza Flutter, Android ni una aplicación móvil nativa. La interfaz de cliente y la de administración forman parte de la PWA Angular.

## 4. Arquitectura

```text
Navegador / PWA Angular
    |
    | HTTP/JSON + JWT
    v
API REST Flask (/api/v1)
    |
    | Blueprints, servicios, modelos ORM
    v
MySQL 8
```

**Frontend:** muestra el catálogo, formularios y dashboard; el guard limita la navegación hacia rutas administrativas y el interceptor incorpora el JWT a las peticiones dirigidas al backend.

**Backend:** valida credenciales, permisos y datos de entrada, ejecuta operaciones de negocio y consulta la base de datos.

**Base de datos:** conserva productos, categorías, usuarios y las entidades previstas para compras, inventarios, pedidos y producción. En las etapas de diseño se trabajó con un esquema de 25 tablas y cuatro vistas; las funcionalidades activas de esta versión no equivalen a la implementación de todos esos módulos.

> **Seguridad:** proteger una ruta con Angular no sustituye la autorización del servidor. Los endpoints administrativos se protegen también con JWT y `@admin_required` en Flask.

## 5. Estructura principal del proyecto

La siguiente estructura muestra los componentes relevantes conocidos hasta la Etapa 3.15. Pueden existir otros modelos, Blueprints, scripts y recursos dentro del repositorio.

```text
toco-madera/
├── README.md
├── backend/
│   ├── run.py
│   ├── requirements.txt                # Si se mantiene el archivo de dependencias
│   ├── .venv/                          # Local, no versionar
│   ├── scripts/
│   │   └── crear_admin.py
│   └── app/
│       ├── __init__.py                # create_app()
│       ├── extensions.py              # db y otras extensiones
│       ├── models/
│       │   ├── producto.py
│       │   └── categoria.py
│       ├── routes/
│       │   └── admin_producto_routes.py
│       └── utils/
│           └── permisos.py             # @admin_required
└── frontend/
    ├── angular.json
    ├── package.json
    └── src/
        ├── styles.css
        └── app/
            ├── app.config.ts
            ├── app.routes.ts
            ├── auth/
            │   ├── login/
            │   │   ├── login.ts
            │   │   ├── login.html
            │   │   └── login.css
            │   └── registro/
            │       ├── registro.ts
            │       ├── registro.html
            │       └── registro.css
            ├── cliente/
            │   └── inicio/
            │       ├── inicio.ts
            │       ├── inicio.html
            │       └── inicio.css
            ├── core/
            │   ├── guards/
            │   │   └── admin.guard.ts
            │   ├── interceptors/
            │   │   └── auth.interceptor.ts
            │   └── services/
            │       ├── api.ts
            │       ├── auth.ts
            │       └── admin-productos.ts
            └── admin/
                ├── dashboard/
                │   ├── dashboard.ts
                │   ├── dashboard.html
                │   └── dashboard.css
                └── productos/
                    ├── productos.ts
                    ├── productos.html
                    └── productos.css
```

## 6. Requisitos de desarrollo

- Windows 11 y PowerShell (entorno utilizado durante el desarrollo; pueden utilizarse otros sistemas operativos ajustando los comandos).
- Python 3.11.9 y `pip`.
- Node.js y npm compatibles con la versión de Angular instalada. Verificar compatibilidad con `npx ng version` y los requisitos oficiales de Angular antes de actualizar Node.
- MySQL Server 8 y, opcionalmente, MySQL Workbench.
- Git y Visual Studio Code.
- Acceso al repositorio y a los scripts SQL del proyecto.

### 6.1. Clonar o abrir el proyecto

```powershell
git clone <URL_DEL_REPOSITORIO>
cd toco-madera
```

Si el proyecto ya está en el equipo, basta con abrir su carpeta en VS Code; **no es necesario clonarlo nuevamente**.

### 6.2. Preparar MySQL

1. Iniciar el servidor MySQL 8.
2. Crear/restaurar la base de datos usando los scripts SQL **reales del repositorio**, en el orden establecido para tablas, claves foráneas, vistas y datos iniciales.
3. Confirmar el nombre de la base de datos y configurar las credenciales de conexión en el backend.
4. Verificar que existen las categorías y los seis productos base.

```sql
-- Ejecutar en MySQL Workbench después de seleccionar
-- la base de datos real utilizada en la configuración:
SHOW TABLES;
SELECT COUNT(*) AS total_productos FROM productos;
SELECT COUNT(*) AS total_categorias FROM categorias;
```

**No ejecutar `DROP TABLE`, `TRUNCATE` o reinicializaciones del ORM sobre una base con datos que quieras conservar.**

### 6.3. Preparar el backend Flask

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip

# Instalar las dependencias declaradas por el proyecto:
python -m pip install -r requirements.txt
```

Configurar las variables requeridas por `backend/app/__init__.py` y los archivos de configuración existentes. Según cómo esté implementada la configuración del repositorio, normalmente incluyen conexión MySQL y clave secreta JWT. **No subir secretos reales a GitHub.** Mantener las credenciales en variables de entorno o en un archivo `.env` ignorado por Git, si el proyecto lo utiliza.

Iniciar:

```powershell
python run.py
```

En el desarrollo local descrito, Flask atiende en `http://127.0.0.1:5000`.

> Si todavía no existe `requirements.txt`, generarlo a partir del entorno virtual verificado y revisar su contenido antes de compartirlo: `python -m pip freeze > requirements.txt`.

### 6.4. Preparar el frontend Angular

Abrir otra terminal desde la raíz del repositorio:

```powershell
cd frontend
npm install
npx ng build
npm start
```

El frontend se ha probado localmente en `http://localhost:4200`.

**Nota sobre Google Fonts:** durante la Etapa 3.14 se resolvió un error `ECONNRESET` al compilar por la descarga de fuentes externas. La configuración de compilación utiliza `optimization.fonts.inline: false` en `frontend/angular.json`, manteniendo otras optimizaciones. El navegador aún puede requerir conexión para cargar Inter y Poppins.

### 6.5. Arranque diario

1. Iniciar MySQL.
2. Iniciar Flask desde `backend` con el entorno virtual activado.
3. Iniciar Angular desde `frontend` con `npm start`.
4. Abrir `http://localhost:4200`.
5. Acceder mediante `/login` con una cuenta válida.

## 7. Rutas del frontend

| URL local | Pantalla | Acceso |
|---|---|---|
| `/` | Catálogo / inicio | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro de cliente | Público |
| `/admin/dashboard` | Panel administrativo y gráfica | ADMIN |
| `/admin/productos` | Gestión de productos | ADMIN |

El guard `adminGuard` protege la navegación hacia `/admin/dashboard` y `/admin/productos`. La API aplica una comprobación adicional del rol en el servidor.

## 8. Endpoints REST implementados o preparados

Prefijo local: `http://127.0.0.1:5000/api/v1`

### 8.1. Autenticación

| Método | Ruta | Propósito |
|---|---|---|
| POST | `/auth/registro` | Registrar cliente |
| POST | `/auth/login` | Validar credenciales y generar JWT |
| GET | `/auth/me` | Consultar usuario autenticado |
| GET | `/auth/admin-check` | Comprobar privilegios administrativos |

### 8.2. Catálogo y dashboard

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/productos/` | Consultar productos del catálogo público |
| GET | `/dashboard/status` | Comprobar endpoint administrativo protegido |

### 8.3. Productos administrativos

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/admin/productos/` | Listar productos activos e inactivos |
| GET | `/admin/productos/categorias` | Listar categorías para el formulario |
| POST | `/admin/productos/` | Registrar producto |
| PUT | `/admin/productos/{id_producto}` | Actualizar información comercial |
| PATCH | `/admin/productos/{id_producto}/estado` | Activar o desactivar producto |

Todos los endpoints del grupo `/admin/productos` exigen JWT y privilegios de administrador.

**Ejemplo de cuerpo JSON para registro o edición:**

```json
{
  "id_categoria": 1,
  "sku": "TM-EJEMPLO-007",
  "nombre": "Producto de ejemplo",
  "descripcion": "Artículo artesanal de prueba",
  "precio_lista": "250.00",
  "permite_grabado": true,
  "max_caracteres_grabado": 40
}
```

**Ejemplo de cambio de estado:**

```json
{
  "activo": false
}
```

Los identificadores de categoría y los SKU del ejemplo deben adaptarse a los datos existentes. El precio se intercambia como cadena decimal para conservar su precisión.

## 9. Reglas de negocio principales

1. Una cuenta administrativa debe tener JWT válido, usuario autorizado y rol `ADMIN` para operar endpoints protegidos.
2. El registro público crea cuentas de cliente; no permite autoconcederse el rol administrador.
3. El SKU identifica de forma única un producto.
4. El precio comercial debe ser positivo y respetar la precisión monetaria definida en MySQL.
5. Un producto puede admitir grabado personalizado con un límite de caracteres; si no admite grabado, su límite es cero.
6. La desactivación de productos es **lógica**: se cambia el campo `activo`, sin borrar el historial ni las relaciones de la base de datos.
7. Los artículos inactivos no deben ofrecerse en el catálogo público.
8. Los datos comerciales del producto se administran por separado de las existencias, lotes y movimientos de inventario.
9. Para pedidos personalizados se contempla un anticipo del **50 %** y liquidación contra entrega, o pago completo al realizar el pedido. La pasarela/pago es **simulado** en el alcance académico previsto.
10. Los pedidos grandes requieren un plazo de fabricación/entrega, mientras que los productos ya disponibles pueden entregarse antes, según existencias y operación.

Las reglas de pedidos, anticipos e inventario están documentadas como **alcance funcional previsto**; no deben confundirse con módulos ya implementados.

## 10. Estado de los módulos al cierre de la Etapa 3.15

| Módulo o capacidad | Estado |
|---|---|
| Estructura de Angular + Tailwind + Flowbite | Implementada |
| API Flask + conexión con MySQL | Implementada |
| Modelo relacional y datos iniciales | Diseñados / cargados durante etapas previas |
| Catálogo público de productos | Implementado |
| Registro e inicio de sesión | Implementados y probados |
| JWT, roles, interceptor y guard administrativo | Implementados |
| Dashboard administrativo | Implementado; estadísticas todavía provisionales |
| Gráfica con Chart.js | Implementada con valores iniciales de ejemplo |
| Cierre de sesión local | Implementado |
| CRUD administrativo de productos | **Implementado y validado en Etapa 3.15** |
| Consulta de categorías para formulario | Implementada y validada |
| Carrito y simulador de pago | Pendiente de integración completa |
| Pedidos e historial del cliente | Pendiente |
| Materias primas, proveedores y compras | Pendiente |
| Inventarios, movimientos y reservas | Pendiente |
| Producción y recetas | Pendiente |
| Indicadores estadísticos reales desde MySQL | Pendiente |
| Pruebas automatizadas, endurecimiento y despliegue | Pendiente |

### Detalle de la Etapa 3.15 terminada

- Servicio Angular `AdminProductos` que centraliza peticiones REST.
- Pantalla `admin/productos` para listar, buscar y filtrar productos.
- Registro de productos con categoría, SKU, nombre, descripción, precio y opciones de grabado.
- Edición de datos comerciales sin alterar el inventario.
- Activación y desactivación con confirmación visual.
- Mensajes de error y éxito; opción de reintentar la carga de categorías.
- Desplazamiento automático al formulario de alta o edición.
- Protección de rutas administrativas mediante guard en Angular y decorador en Flask.
- Comprobaciones manuales de funcionamiento confirmadas por el equipo en entorno local.

## 11. Pruebas manuales realizadas / a mantener

### Autenticación y navegación

- Registrar un cliente y comprobar que accede al catálogo.
- Iniciar sesión como administrador y entrar al dashboard.
- Cerrar sesión y comprobar que una ruta administrativa redirige al login.
- Intentar consultar un endpoint protegido sin JWT y verificar una respuesta de rechazo.

### Productos

- Consultar los seis productos base.
- Buscar por nombre y SKU.
- Filtrar productos activos e inactivos.
- Abrir «Nuevo producto» y cargar categorías.
- Abrir «Editar» y comprobar que los datos aparecen en el formulario.
- Registrar y guardar datos válidos.
- Activar/desactivar y comprobar el comportamiento del catálogo público.
- Probar campos inválidos, SKU repetido y ausencia de permisos.

**Resultado reportado al cierre de la Etapa 3.15:** se verificó el funcionamiento del formulario nuevo, la edición y el guardado, después de corregir la carga/visibilidad del formulario. No se afirma que exista todavía cobertura de pruebas automatizadas.

Comandos útiles:

```powershell
# Desde frontend
npx ng build

# Desde backend
python -m compileall app run.py
python -c "from app import create_app; app=create_app(); print(app.url_map)"
```

## 12. Seguridad y consideraciones técnicas

- No compartir contraseñas, archivos `.env`, claves JWT ni tokens en el repositorio.
- Crear administradores únicamente mediante el procedimiento administrativo autorizado (`backend/scripts/crear_admin.py`).
- No confiar en las validaciones de Angular como única protección: Flask debe validar nuevamente todos los campos.
- La sesión Angular actual mantiene el JWT **en memoria**; al recargar la pestaña puede requerirse iniciar sesión otra vez.
- El botón «Cerrar sesión» limpia la sesión local; **no implementa revocación del JWT en el servidor**. La revocación y la gestión robusta de sesiones quedan pendientes para un entorno productivo.
- Revisar CORS, expiración de tokens, variables de entorno, manejo de errores y auditoría antes de desplegar.
- El endpoint de dashboard de estado no equivale a que los indicadores de negocio ya estén conectados a consultas estadísticas reales.

## 13. Control de versiones

Se utiliza Git y GitHub. Antes de registrar una etapa:

```powershell
# Desde la raíz del repositorio
git status
git add README.md backend frontend
git commit -m "feat: completar etapa 3.15 CRUD administrativo de productos"
git push origin main
```

Revisar siempre `git status` y `git diff --cached` antes del commit para asegurar que no se incluyan secretos, archivos temporales ni el entorno virtual.

## 14. Próximas etapas

1. Administración de materias primas y proveedores.
2. Compras y recepción de materiales.
3. Inventarios, movimientos, existencias y alertas.
4. Recetas/listas de materiales y órdenes de producción.
5. Pedidos, personalización, carrito y pagos simulados.
6. Indicadores reales y gráficas desde MySQL.
7. Pruebas integrales, accesibilidad, seguridad, PWA y preparación de entrega.

El orden exacto puede ajustarse según dependencias y prioridades del equipo, manteniendo la arquitectura Angular + Flask + MySQL.

## 15. Historial de hitos

| Etapa | Resumen |
|---|---|
| 3.13 | Backend Flask, MySQL, modelos y autenticación base |
| 3.14 | Integración de login/registro Angular, JWT, guard, dashboard y cierre de sesión |
| **3.15** | **CRUD administrativo de productos: consulta, categorías, alta, edición, búsqueda, filtros y cambio de estado; validación funcional completada** |

---

**Política de documentación:** al terminar cada etapa numerada completa se actualiza **todo este README general**, con información verificable sobre funcionalidades terminadas, pruebas realizadas y pendientes. No se documentan como concluidos módulos aún no construidos.

Actualizacion Ejemplo

**Proyecto académico — Toco Madera, León, Guanajuato, México.**
