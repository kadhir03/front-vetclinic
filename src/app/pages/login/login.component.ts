//pages/login/login.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService, 
    private loginService: LoginService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.alertService.showError('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    this.loading = true;
    const { username, password } = this.loginForm.value;
  
    // Realiza el intento de inicio de sesión
    this.subscription.add(
      this.loginService.login(username, password).subscribe(
        () => {
          // Aquí asumimos que el token y el rol ya fueron manejados dentro de loginService
          const rolId = this.loginService.getRolId(); // Obtiene el rolId almacenado previamente
  
          // Redirección basada en el rol del usuario
          switch(rolId) {
            case 2: // Admin
              this.router.navigate(['/dashadmin']);
              break;
            case 3: // Otro rol específico
              this.router.navigate(['/work']);
              break;
            default:
              this.router.navigate(['/login']); // Redirige al login si el rol no coincide
              break;
          }
          this.alertService.showSuccess("El inicio de sesión ha sido exitoso.");
        },
        (error) => {
          this.error = error.status === 401 ? 'Credenciales inválidas. Por favor, vuelva a intentarlo.' : 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
          this.loading = false;
          this.alertService.showError(this.error);
        }
      )
    );
  }
  
}

