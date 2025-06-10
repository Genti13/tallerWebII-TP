import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   standalone: false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegistro!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmar: ['', Validators.required]
    });
  }

  registrarse() {
    if (this.formRegistro.valid) {
      const datos = this.formRegistro.value;
      console.log('Datos de registro:', datos);
      // Acá podrías enviar los datos a un backend
    }
  }
}
