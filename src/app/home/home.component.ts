import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToSection(event: Event, secao: string) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const elemento = document.getElementById(secao);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
