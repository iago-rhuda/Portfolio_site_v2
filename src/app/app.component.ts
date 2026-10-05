import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-site';
  secaoAtiva: string = 'HOME';

  showBackToTop = false;

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.addLangs(['en', 'pt', 'fr', 'it', 'es', 'de', 'ko', 'ja', 'zh']);
    const supported = ['en', 'pt', 'fr', 'it', 'es', 'de', 'ko', 'ja', 'zh'];
    let initialLang = 'en';
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('portfolio_lang');
      if (savedLang && supported.includes(savedLang)) {
        initialLang = savedLang;
      } else {
        const browserLang = this.translate.getBrowserLang();
        if (browserLang && supported.includes(browserLang)) {
          initialLang = browserLang;
        }
      }
    }
    this.translate.use(initialLang);

    this.translate.onLangChange.subscribe(() => {
      this.translate.get('PAGE_TITLE').subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    });
  }

  // =============================================================================
  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animeScroll();
    window.addEventListener('scroll', () => {
      this.animeScroll();
    });
  }

  private animeScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const items = document.querySelectorAll("[data-anime]");
    const windowTop = window.pageYOffset + window.innerHeight * 0.85;

    items.forEach((element: any) => {
      const elementTop = element.getBoundingClientRect().top;

      if (windowTop > elementTop) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    });
  }
  // =============================================================================

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.detectarSecaoAtiva();
    this.animeScroll();
    if (isPlatformBrowser(this.platformId)) {
      this.showBackToTop = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setSecaoAtiva(secao: string) {
    this.secaoAtiva = secao;
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
