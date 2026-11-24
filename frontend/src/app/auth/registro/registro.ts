/**
 * ==========================================
 * TOCO MADERA - REGISTRO DE CLIENTES
 * Archivo: frontend/src/app/auth/registro/registro.ts
 * ==========================================
 * Responsabilidades:
 * - Capturar los datos del cliente.
 * - Validar el formulario, incluido el teléfono obligatorio.
 * - Registrar la cuenta mediante Flask.
 * - Redirigir al login después del registro.
 */

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  // ========================================
  // 1. SERVICIOS
  // ========================================
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  // ========================================
  // 2. CAMPOS DEL FORMULARIO
  // ========================================
  nombre = '';
  correo = '';
  telefono = '';
  password = '';
  confirmarPassword = '';

  // ========================================
  // 3. ESTADO DE LA INTERFAZ
  // ========================================
  cargando = signal(false);
  error = signal('');
  mostrarPassword = signal(false);

  // ========================================
  // 4. MOSTRAR U OCULTAR CONTRASEÑAS
  // ========================================
  cambiarVisibilidad(): void {
    this.mostrarPassword.update((valor) => !valor);
  }

  // ========================================
  // 5. REGISTRAR CLIENTE
  // ========================================
  registrarCliente(): void {
    if (this.cargando()) {
      return;
    }

    this.error.set('');

    const nombreLimpio = this.nombre.trim();
    const correoLimpio = this.correo.trim().toLowerCase();
    const telefonoLimpio = this.telefono.trim();

    if (nombreLimpio.length < 2) {
      this.error.set('Ingresa un nombre de al menos 2 caracteres.');
      return;
    }

    // El HTML también valida correo, pero verificamos aquí
    // para evitar solicitudes inválidas al invocar el método.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      this.error.set('Ingresa un correo electrónico válido.');
      return;
    }

    // Teléfono nacional mexicano: exactamente 10 dígitos.
    // No aceptar espacios, letras, prefijos ni símbolos.
    if (!/^[0-9]{10}$/.test(telefonoLimpio)) {
      this.error.set('El teléfono es obligatorio y debe tener exactamente 10 dígitos.');
      return;
    }

    if (this.password.length < 8 || this.password.length > 128) {
      this.error.set('La contraseña debe tener entre 8 y 128 caracteres.');
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.cargando.set(true);

    this.auth.registrar({
      nombre: nombreLimpio,
      correo: correoLimpio,
      telefono: telefonoLimpio,
      password: this.password,
    }).subscribe({
      next: () => {
        this.cargando.set(false);
        this.password = '';
        this.confirmarPassword = '';
        this.alertaTerracota('¡Cuenta creada!', 'Tu registro se completó con éxito.', 'success');
        this.router.navigate(['/login'], {
          queryParams: { registrado: '1' },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.cargando.set(false);
        if (error.status === 409) {
          this.error.set('Este correo ya está registrado.');
        } else if (error.status === 400) {
          this.error.set(error.error?.message || 'Revisa los datos del formulario.');
        } else if (error.status === 0) {
          this.error.set('No se pudo conectar con Flask.');
        } else {
          this.error.set('Ocurrió un error al crear la cuenta.');
        }
      },
    });
  }
  private alertaTerracota(titulo: string, texto: string, icono: 'success' | 'warning' | 'info' | 'error' = 'success'): void {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    timer: 1800,
    showConfirmButton: false,
    background: '#b85d3b',
    color: '#ffffff',
    customClass: {
      popup: 'rounded-[1.75rem_0.75rem_1.75rem_0.75rem] shadow-2xl border border-white/20',
    },
  });
}
}
