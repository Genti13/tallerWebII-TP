import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/LoginService/login.service';  
import { Router } from '@angular/router';
import { AuthService } from '../servicios/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
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

    // this.loginService.loginUsuario(datos).subscribe(
    //   res => {
    //     console.log('Login exitoso:', res);
    //     this.errorMsg = '';  // limpiar mensaje de error
    //     // Acá podés redirigir o guardar token, etc.
    //   },
    //   err => {
    //     console.error('Error de login:', err);
    //     this.errorMsg = 'Email o contraseña incorrectos';
    //   }
    // );
  this.loginService.loginUsuario(datos).subscribe(
  res => {
    console.log('Login exitoso:', res);
    this.errorMsg = '';

    this.authService.login(); // ← GUARDAMOS ESTADO DE LOGIN
    this.router.navigate(['/']); // ← REDIRECCIÓN DESPUÉS DEL LOGIN
  },
  err => {
    console.error('Error de login:', err);
    this.errorMsg = 'Email o contraseña incorrectos';
  }
);

  }
}

}
