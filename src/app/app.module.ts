import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';

@NgModule({ declarations: [
        AppComponent,
        ProductosComponent,
        CarritoComponent,
        HomeComponent,
        RegisterComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
       MenubarModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
    RippleModule,
    BrowserAnimationsModule
  ],
    bootstrap: [AppComponent], 
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
