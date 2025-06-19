import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/LoginService/login.service';  
import { Router } from '@angular/router';
import { AuthService } from '../servicios/AuthService/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private authService: AuthService ){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],  
      password: ['', Validators.required]
    });
  }


iniciarSesion() {
  if (this.formLogin.valid) {
    const datos = this.formLogin.value;
    console.log('Login:', datos);

  this.loginService.loginUsuario(datos).subscribe(
  res => {
    console.log('Login exitoso:', res);
    this.errorMsg = '';

    this.authService.login(); 
    this.router.navigate(['/']); 
  },
  err => {
    console.error('Error de login:', err);
    this.errorMsg = 'Email o contraseña incorrectos';
  }
);

  }
}

}
