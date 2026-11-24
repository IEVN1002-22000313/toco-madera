/**
 * ============================================================
 * TOCO MADERA - PÁGINA DE INICIO DEL CLIENTE
 *
 * Archivo:
 * frontend/src/app/cliente/inicio/inicio.ts
 *
 * ETAPA 3.18 - CORRECCIÓN DE NAVEGACIÓN Y SESIÓN
 * ============================================================
 *
 * FUNCIONALIDADES:
 *
 * 1. Mostrar información de la empresa.
 * 2. Consultar catálogo desde Flask y MySQL.
 * 3. Mostrar productos, precios y personalización.
 * 4. Controlar estados de carga y errores.
 * 5. Desplazarse correctamente al catálogo.
 * 6. Identificar si existe una sesión activa.
 * 7. Diferenciar CLIENTE y ADMIN.
 * 8. Permitir cerrar sesión.
 * 9. Conservar el carrito al cerrar sesión.
 *
 * IMPORTANTE:
 *
 * - El backend valida los permisos reales.
 * - El frontend solo adapta la navegación.
 * - No se modifican productos ni inventario.
 * ============================================================
 */

import { Component, OnInit, inject, signal } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

// ============================================================
// SERVICIOS EXISTENTES DEL PROYECTO
// ============================================================

import { Auth } from '../../core/services/auth';

import { CatalogoCarritoService } from '../../core/services/catalogo-carrito';

import { ProductoCatalogo } from '../../core/services/carrito';

import { CarritoService } from '../../core/services/carrito';

// ============================================================
// COMPONENTE ANGULAR
// ============================================================

import { imagenProducto } from '../../core/utils/imagenes-productos';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-inicio',
  standalone: true,

  imports: [RouterLink, CurrencyPipe],

  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  // ==========================================================
  // 1. SERVICIOS
  // ==========================================================
  readonly imagenProducto = imagenProducto; // Función para obtener la imagen de un producto.
  // Autenticación existente del proyecto.
  readonly auth = inject(Auth);

  // Carrito existente: conserva artículos en localStorage.
  readonly carrito = inject(CarritoService);

  // Servicio público de productos.
  private readonly catalogoApi = inject(CatalogoCarritoService);

  // Navegación programática de Angular.
  private readonly router = inject(Router);

  // ==========================================================
  // 2. IDENTIDAD DE LA EMPRESA
  // ==========================================================

  readonly nombreEmpresa = 'Toco Madera';

  readonly eslogan = 'Frases que vienen de raíz y se graban en el corazón.';

  // ==========================================================
  // 3. SIGNALS DEL CATÁLOGO
  // ==========================================================

  // Lista de productos recibidos desde Flask.
  readonly productos = signal<ProductoCatalogo[]>([]);

  // Indica que estamos consultando la API.
  readonly cargandoProductos = signal(true);

  // Mensaje visible si ocurre una falla.
  readonly errorProductos = signal('');

  // ==========================================================
  // 4. INICIALIZACIÓN
  // ==========================================================

  ngOnInit(): void {
    setTimeout(() => initFlowbite(), 0);
    // Consultar los productos al abrir la tienda.
    this.cargarProductos();
  }

  // ==========================================================
  // 5. CARGAR PRODUCTOS DESDE FLASK
  // ==========================================================

  cargarProductos(): void {
    this.cargandoProductos.set(true);
    this.errorProductos.set('');

    // El servicio reutiliza:
    // GET http://127.0.0.1:5000/api/v1/productos/
    this.catalogoApi.listar().subscribe({
      // ------------------------------------------------------
      // CONSULTA EXITOSA
      // ------------------------------------------------------

      next: (productos: ProductoCatalogo[]) => {
        // Guardar productos en el Signal.
        this.productos.set(productos);

        // Finalizar estado de carga.
        this.cargandoProductos.set(false);
        setTimeout(() => initFlowbite(), 0);
      },

      // ------------------------------------------------------
      // ERROR DE CONEXIÓN O RESPUESTA
      // ------------------------------------------------------

      error: (error: unknown) => {
        console.error('Error al cargar el catálogo:', error);

        // Identificar errores HTTP.
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.errorProductos.set(
              'No es posible conectar con Flask. ' +
                'Verifica que el backend esté encendido ' +
                'en el puerto 5000.',
            );
          } else {
            this.errorProductos.set('El servidor no pudo consultar ' + 'el catálogo de productos.');
          }
        } else {
          this.errorProductos.set('No fue posible interpretar la respuesta ' + 'del catálogo.');
        }

        this.cargandoProductos.set(false);
      },
    });
  }

  // ==========================================================
  // 6. DESPLAZARSE A LA SECCIÓN DE PRODUCTOS
  // ==========================================================

  /**
   * Este método resuelve el problema anterior:
   *
   * routerLink="/" fragment="catalogo"
   *
   * En lugar de depender de la configuración
   * del Router, nos desplazamos directamente
   * hasta la sección del catálogo.
   */
  irAlCatalogo(): void {
    const seccion = document.getElementById('catalogo');

    if (!seccion) {
      return;
    }

    seccion.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // ==========================================================
  // 7. CERRAR SESIÓN
  // ==========================================================

  /**
   * El servicio Auth elimina:
   *
   * - JWT almacenado en memoria.
   * - JWT guardado en sessionStorage.
   * - Datos del usuario autenticado.
   *
   * No borra el carrito de compras.
   */

  /**
   * ==========================================================
   * TOCO MADERA - CONFIRMACIÓN DE CIERRE DE SESIÓN
   * ETAPA 3.18
   * ==========================================================
   *
   * Antes de cerrar la sesión:
   * - Solicita confirmación al usuario.
   * - Si cancela, conserva su sesión.
   * - Si acepta, elimina el JWT mediante Auth.
   * - Conserva los productos del carrito.
   * - Regresa al inicio.
   */
  cerrarSesionCliente(): void {
    // Mostrar ventana de confirmación de Chrome.
    const confirmar = window.confirm('¿Estás seguro de que quieres cerrar sesión?');

    // Si el usuario selecciona Cancelar,
    // no se modifica su sesión.
    if (!confirmar) {
      return;
    }

    // Eliminar el JWT y el perfil autenticado.
    this.auth.cerrarSesion();

    // Regresar a la tienda.
    this.router.navigateByUrl('/');
  }

  // ==========================================================
  // 8. FORMATEAR IMPORTES
  // ==========================================================

  /**
   * Disponible para cálculos auxiliares.
   *
   * El HTML utiliza principalmente CurrencyPipe.
   * Los precios definitivos se validan en Flask.
   */
  formatearPrecio(valor: string | number): string {
    return Number(valor).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    });
  }
}
