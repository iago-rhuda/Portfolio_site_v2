import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.css']
})
export class SwitchLangComponent implements OnInit {

  options = [
    { value: 'en', display: 'English', flag: '🇺🇸' },
    { value: 'pt', display: 'Português', flag: '🇧🇷' },
    { value: 'fr', display: 'Français', flag: '🇫🇷' },
    { value: 'es', display: 'Español', flag: '🇪🇸' },
    { value: 'it', display: 'Italiano', flag: '🇮🇹' },
    { value: 'de', display: 'Deutsch', flag: '🇩🇪' },
    { value: 'ko', display: '한국어', flag: '🇰🇷' },
    { value: 'ja', display: '日本語', flag: '🇯🇵' },
    { value: 'zh', display: '中文', flag: '🇨🇳' }
  ];

  isDarkMode = false;
  showName = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showName = window.scrollY > 100;
    }
  }

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateTheme();

    const rawPath = this.location.path();
    const cleanPath = rawPath.split('#')[0].split('?')[0];
    const pathSegment = cleanPath.replace(/^\//, '').split('/')[0]?.toLowerCase();
    const matchedOption = this.options.find(o => o.value === pathSegment);

    let activeLang = 'en';

    if (matchedOption) {
      activeLang = matchedOption.value;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('portfolio_lang', activeLang);
      }
    } else if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('portfolio_lang');
      const supportedSaved = this.options.find(o => o.value === savedLang)?.value;

      if (supportedSaved) {
        activeLang = supportedSaved;
      } else {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        const langCode = browserLang ? browserLang.split('-')[0].toLowerCase() : 'en';
        activeLang = this.options.find(o => o.value === langCode) ? langCode : 'en';
      }
      localStorage.setItem('portfolio_lang', activeLang);
    }

    this.translate.use(activeLang);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = activeLang;
      if (!matchedOption) {
        this.location.go('/' + activeLang);
      }

      this.location.onUrlChange((url) => {
        const clean = url.split('#')[0].split('?')[0];
        const seg = clean.replace(/^\//, '').split('/')[0]?.toLowerCase();
        const found = this.options.find(o => o.value === seg);
        if (found && found.value !== this.translate.currentLang) {
          this.translate.use(found.value);
          localStorage.setItem('portfolio_lang', found.value);
          document.documentElement.lang = found.value;
        }
      });
    }
  }

  onChange(lang: string) {
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
      this.location.go('/' + lang);
    }
  }

  getFlag() {
    const lang = this.translate.currentLang;
    const option = this.options.find(o => o.value === lang);
    return option ? option.flag : '🇺🇸'; // Default to US flag if undefined
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  updateTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }
}