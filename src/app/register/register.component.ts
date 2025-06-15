import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../servicios/RegisterService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   standalone: false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegistro!: FormGroup;

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
      console.log('Registro exitoso:', respuesta);
      alert('¡Registro exitoso!');
      this.formRegistro.reset();
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error al registrar:', error);
      alert('Ocurrió un error al registrar. Verificá los datos o intentá más tarde.');
    }
  });
}


}
