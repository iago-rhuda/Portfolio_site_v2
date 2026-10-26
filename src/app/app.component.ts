import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

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
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.addLangs(['en', 'fr', 'pt']);
    const supported = ['en', 'fr', 'pt'];
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

    this.translate.onLangChange.subscribe((event) => {
      this.updateSeo(event.lang);
    });

    // Initial SEO update
    this.updateSeo(initialLang);
  }

  private updateSeo(lang: string): void {
    this.translate.get(['PAGE_TITLE', 'META_DESCRIPTION']).subscribe(translations => {
      const title = translations['PAGE_TITLE'] || 'Iago Rhudá Ramos | Computer Engineer & AI';
      const description = translations['META_DESCRIPTION'] || 'Computer Engineer & AI Researcher specializing in Machine Learning, predictive maintenance, embedded systems, and intelligent automation.';

      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ property: 'og:url', content: 'https://iagoramos.com/' + (lang === 'en' ? '' : lang) });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:description', content: description });

      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.lang = lang;
      }
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
    const secoes = ['HOME', 'ABOUT', 'EXPERIENCE', 'QUALIFICATIONS', 'SKILLS', 'PORTFOLIO', 'ARTICLES', 'CONTACT'];

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
