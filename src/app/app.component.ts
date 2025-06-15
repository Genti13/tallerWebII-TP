import { Component } from '@angular/core';
import { AuthService } from './servicios/AuthService/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = 'tallerWeb-tp';


salir() {
    this.authService.logout();
  }

}
