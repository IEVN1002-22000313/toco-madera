/** TOCO MADERA - Login con retorno seguro al checkout. */
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login', standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html', styleUrl: './login.css'
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  correo = '';
  password = '';
  readonly cargando = signal(false);
  readonly error = signal('');
  readonly mostrarPassword = signal(false);
  registroExitoso = this.route.snapshot.queryParamMap.get('registrado') === '1';

  cambiarVisibilidad(): void { this.mostrarPassword.update(v => !v); }

  iniciarSesion(): void {
    if (this.cargando()) return;
    this.error.set('');
    if (!this.correo.trim() || !this.password) {
      this.error.set('Ingresa tu correo y contraseña.'); return;
    }
    this.cargando.set(true);
    this.auth.iniciarSesion({ correo: this.correo.trim(), password: this.password }).subscribe({
      next: respuesta => {
        this.cargando.set(false);
        this.password = '';
        this.alertaTerracota('¡Bienvenido!', 'Sesión iniciada correctamente.', 'success');
        if (respuesta.usuario.rol === 'ADMIN') {
          this.router.navigateByUrl('/admin/dashboard');
          return;
        }
        // Nunca usar un returnUrl arbitrario: permitir solo los destinos del cliente.
        const retorno = this.route.snapshot.queryParamMap.get('returnUrl');
        const permitidos = ['/cliente/carrito', '/cliente/checkout', '/cliente/mis-pedidos'];
        this.router.navigateByUrl(retorno && permitidos.includes(retorno) ? retorno : '/');
      },
      error: (e: HttpErrorResponse) => {
        this.cargando.set(false);
        if (e.status === 0) this.error.set('No se pudo conectar con Flask.');
        else if (e.status === 401) this.error.set('Correo o contraseña incorrectos.');
        else if (e.status === 403) this.error.set('Esta cuenta está desactivada.');
        else this.error.set('No fue posible iniciar sesión. Intenta nuevamente.');
      }
    });
  }

  private alertaTerracota(titulo: string, texto: string, icono: 'success' | 'warning' | 'info' | 'error' = 'success'): void {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    timer: 1800,
    showConfirmButton: false,
    background: '#b85d3b', // Tono terracota
    color: '#ffffff',
    customClass: {
      popup: 'rounded-[1.75rem_0.75rem_1.75rem_0.75rem] shadow-2xl border border-white/20',
    },
  });
}
  
}
