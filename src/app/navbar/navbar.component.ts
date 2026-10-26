import { Component, HostListener, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  secaoAtiva: string = 'HOME';
  isMenuOpen: boolean = false;
  private isManualScrolling: boolean = false;
  private scrollTimeout: any = null;

  private readonly secoes: string[] = [
    'HOME',
    'ABOUT',
    'EXPERIENCE',
    'QUALIFICATIONS',
    'SKILLS',
    'PORTFOLIO',
    'ARTICLES',
    'CONTACT'
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isManualScrolling) {
      this.detectarSecaoAtiva();
    }
  }

  setSecaoAtiva(secao: string) {
    this.secaoAtiva = secao;
    this.isMenuOpen = false;
  }

  scrollToSection(event: Event, secao: string) {
    event.preventDefault();
    this.setSecaoAtiva(secao);
    this.isManualScrolling = true;

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (isPlatformBrowser(this.platformId)) {
      const elemento = document.getElementById(secao);
      if (elemento) {
        const yOffset = -30;
        const y = elemento.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }

    this.scrollTimeout = setTimeout(() => {
      this.isManualScrolling = false;
      this.detectarSecaoAtiva();
    }, 850);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private detectarSecaoAtiva() {
    if (!isPlatformBrowser(this.platformId)) return;

    for (let i = this.secoes.length - 1; i >= 0; i--) {
      const secao = this.secoes[i];
      const elemento = document.getElementById(secao);
      if (elemento) {
        const top = elemento.offsetTop;
        if (window.scrollY >= top - 250) {
          this.secaoAtiva = secao;
          return;
        }
      }
    }
    this.secaoAtiva = 'HOME';
  }
}
