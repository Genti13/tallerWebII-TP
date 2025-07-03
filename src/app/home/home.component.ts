import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterModule, RouterLink]
})
export class HomeComponent implements OnInit, AfterViewInit {

  frases: string[] = [
    '¡Tu mascota merece lo mejor!',
    'Envíos rápidos y atención personalizada.',
    'Productos de calidad para cada peludo.',
    '¡Descubrí ofertas y novedades cada semana!'
  ];
  typingSpeed = 55;
  erasingSpeed = 30;
  delayBetween = 1200;
  fraseIndex = 0;
  charIndex = 0;
  isErasing = false;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.typeFrase();
  }

  typeFrase() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    const currentFrase = this.frases[this.fraseIndex];
    if (!this.isErasing) {
      typingText.textContent = currentFrase.substring(0, this.charIndex + 1);
      if (this.charIndex < currentFrase.length) {
        this.charIndex++;
        setTimeout(() => this.typeFrase(), this.typingSpeed);
      } else {
        this.isErasing = true;
        setTimeout(() => this.typeFrase(), this.delayBetween);
      }
    } else {
      typingText.textContent = currentFrase.substring(0, this.charIndex - 1);
      if (this.charIndex > 0) {
        this.charIndex--;
        setTimeout(() => this.typeFrase(), this.erasingSpeed);
      } else {
        this.isErasing = false;
        this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
        setTimeout(() => this.typeFrase(), 600);
      }
    }
  }
}
