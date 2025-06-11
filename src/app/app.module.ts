import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule, ToastrModule.forRoot(), BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
