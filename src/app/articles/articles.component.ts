import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  private readonly SOURCE = [
    {
      title: 'Tabular Prior-Data Fitted Network For Structural Damage Prediction',
      link: 'https://www.researchgate.net/publication/400245149_Tabular_Prior-data_Fitted_Network_for_Structural_Damage_Prediction',
      description: 'ARTICLE_COBEM_DESC',
      longDescription: 'ARTICLE_COBEM_LONG_DESC',
      lang: 'en',
      pending: false,
      hideButton: false
    },
    {
      title: 'ARTICLE_PIBIC_TITLE',
      link: '',
      description: 'ARTICLE_PIBIC_DESC',
      longDescription: 'ARTICLE_PIBIC_LONG_DESC',
      lang: 'pt',
      isDynamicLang: true,
      pending: false,
      hideButton: true
    }
  ];

  articles = [
    ...this.SOURCE
  ];

  modalVisible = false;
  selectedArticle: any = null;

  private isDragging = false;
  private dragStartX = 0;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    public translate: TranslateService
  ) {}

  getArticleLang(article: any): string {
    if (!article) return 'EN';
    if (article.isDynamicLang) {
      return this.translate.currentLang || 'en';
    }
    return article.lang;
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  private get track(): HTMLDivElement {
    return this.trackRef.nativeElement;
  }

  onPointerDown(event: PointerEvent): void {
    this.dragStartX = event.clientX;
    this.isDragging = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (Math.abs(event.clientX - this.dragStartX) > 6) {
      this.isDragging = true;
    }
  }

  onCardClick(article: any, event: Event): void {
    if (!this.isDragging) {
      this.openArticle(article, event);
    }
    this.isDragging = false;
  }

  openArticle(article: any, event: Event): void {
    event.stopPropagation();
    this.selectedArticle = article;
    this.modalVisible = true;
    this.pauseAutoPlay();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.modalVisible = false;
    setTimeout(() => {
      this.selectedArticle = null;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    }, 300);
    this.resumeAutoPlay();
  }

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (this.modalVisible) this.closeModal();
  }

  onScroll(): void {}

  private getCardScrollAmount(): number {
    const el = this.track;
    if (!el) return 360;
    const card = el.querySelector('.project-card') as HTMLElement;
    if (!card) return 360;
    const gap = parseFloat(getComputedStyle(el).columnGap || '28');
    return card.offsetWidth + gap;
  }

  scrollLeft(): void {
    if (this.track) {
      this.track.scrollBy({ left: -this.getCardScrollAmount(), behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.track) {
      this.track.scrollBy({ left: this.getCardScrollAmount(), behavior: 'smooth' });
    }
  }

  pauseAutoPlay(): void {}
  resumeAutoPlay(): void {}

  @HostListener('window:resize')
  onResize(): void {}
}
