import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  // private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  private emailRegex = /^[^@]+@[^@]+\.com$/;

  onSubmit(): void {
    this.loginError = '';

    if (!this.validarEmail(this.email)) {
       this.loginError = 'Por favor, ingresa un correo válido.';
      return;
    }


    if (!this.validarPassword(this.password)) {
      this.loginError = 'La contraseña debe tener al menos 6 caracteres y 1 número.';
      return;
    }

    alert(`Login exitoso`);
  }

  validarPassword(password: string): boolean {
    const tieneNumero = /\d/.test(password);
    const largoSuficiente = password.length >= 6;
    return tieneNumero && largoSuficiente;
  }

  validarEmail(email: string): boolean {
    const regex = /^[^@]+@[^@]+\.com$/;
    return regex.test(email);
  }



}

