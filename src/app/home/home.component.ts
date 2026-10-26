import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translate: TranslateService
  ) {}


  scrollToSection(event: Event, secao: string) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const elemento = document.getElementById(secao);
      if (elemento) {
        const yOffset = -30;
        const y = elemento.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  }
}
