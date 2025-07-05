import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../servicios/RegisterService/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   standalone: true,
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})

export class RegisterComponent implements OnInit {
  formRegistro!: FormGroup;
  mensajeErrores: string[] = []; 

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router:Router) {}

  ngOnInit() {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmar: ['', Validators.required]
    });
  }

  registrarse() {
  this.mensajeErrores = []; 

  if (this.formRegistro.invalid) {
    this.formRegistro.markAllAsTouched();
    this.mensajeErrores.push('Complete todos los campos correctamente');
    return; 
  }

  const { nombre, apellido, direccion, email, password, confirmar } = this.formRegistro.value;
  const datosRegistro = { nombre, apellido, direccion, email, password, confirmar };

  this.registerService.registrarUsuario(datosRegistro).subscribe({
    next: (respuesta) => {
      this.mensajeErrores = [];

      // Validación de contraseña
      if (password !== confirmar) {
        this.mensajeErrores.push('Las contraseñas no coinciden');
        return; 
      }

      alert('¡Registro exitoso!');
      this.formRegistro.reset();
      this.router.navigate(['/']);
    },
    error: (error: HttpErrorResponse) => {
      this.mensajeErrores = []; 

      // Si devuelve varios errores
      if (error.error?.errors && Array.isArray(error.error.errors)) {
        this.mensajeErrores = error.error.errors;
      }
      // Si devuelve un único error 
      else if (error.error?.error) {
        if (error.error.error === 'El email ya está registrado') {
          this.mensajeErrores.push('El email ya está registrado. Por favor usa otro.');
        } else {
          this.mensajeErrores.push(error.error.error);
        }
      } else {
        this.mensajeErrores.push('Ocurrió un error al registrar. Verificá los datos o intentá más tarde.');
      }

      if (password !== confirmar && !this.mensajeErrores.includes('Las contraseñas no coinciden')) {
        this.mensajeErrores.push('Las contraseñas no coinciden');
      }
    }
  });
}

}