import { Component } from '@angular/core';
import { AuthService } from './servicios/AuthService/auth.service';
import { CarritoService } from './servicios/CartService/carrito.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  constructor(public authService: AuthService, public router: Router, public carritoService: CarritoService) {}
  title = 'tallerWeb-tp';


salir() {
    this.authService.logout();
    this.carritoService.resetFilters();
    this.router.navigate(['/']);
  }

}
