import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  secaoAtiva: string = 'HOME';
  isMenuOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Lógica para determinar a seção ativa durante o rolar da página
    this.detectarSecaoAtiva();
  }

  setSecaoAtiva(secao: string) {
    this.secaoAtiva = secao;
    this.isMenuOpen = false; // Close menu on selection
  }

  scrollToSection(event: Event, secao: string) {
    event.preventDefault();
    this.setSecaoAtiva(secao);
    if (isPlatformBrowser(this.platformId)) {
      const elemento = document.getElementById(secao);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private detectarSecaoAtiva() {
    if (!isPlatformBrowser(this.platformId)) return;
    const secoes = ['HOME', 'ABOUT', 'QUALIFICATIONS', 'SKILLS', 'PORTFOLIO', 'ARTICLES', 'CURRICULUM', 'CONTACT'];

    for (const secao of secoes) {
      const elemento = document.getElementById(secao);

      if (elemento) {
        const retangulo = elemento.getBoundingClientRect();

        if (retangulo.top <= 50 && retangulo.bottom >= 50) {
          this.setSecaoAtiva(secao);
          break;
        }
      }
    }
  }
}
