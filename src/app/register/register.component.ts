import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../servicios/RegisterService/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private registerService: RegisterService) {}

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
  if (this.formRegistro.invalid) {
    this.formRegistro.markAllAsTouched();
    return;
  }

  const { nombre, apellido, direccion, email, password, confirmar } = this.formRegistro.value;

  if (password !== confirmar) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const datosRegistro = {
    nombre,
    apellido,
    direccion,
    email,
    password
  };


this.registerService.registrarUsuario(datosRegistro).subscribe({
  next: (respuesta) => {
    alert('¡Registro exitoso!');
    this.formRegistro.reset();
    this.mensajeError = '';
  },
  error: (error: HttpErrorResponse) => {
    if (error.status === 400 && error.error?.message) {
      this.mensajeError = error.error.message; 
    } else {
      this.mensajeError = 'Ocurrió un error al registrar. Verificá los datos o intentá más tarde.';
    }
  }
});


}


}
