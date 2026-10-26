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

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class SlideComponent implements AfterViewInit, OnDestroy {

  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  // ── Source projects ─────────────────────────────────────────
  private readonly SOURCE: Project[] = [
    {
      titleKey: 'SEARCH-ENGINE',
      titleSuffix: null,
      descKey: 'CARD-TEXT-SEARCH-ENGINE',
      longDescKey: 'CARD-LONG-SEARCH-ENGINE',
      categoryKey: 'CAT-AI-NLP',
      categoryClass: 'cat-ai-nlp',
      techs: ['Python', 'Flask', 'NLP', 'TF-IDF', 'Levenshtein'],
      githubUrl: 'https://github.com/iago-rhuda/Search_Engine',
      visitUrl: null,
      visitKey: null,
      isFeatured: false,
      isInProgress: false,
    },
    {
      titleKey: 'PROJECT_RAG_TITLE',
      titleSuffix: null,
      descKey: 'CARD-TEXT-RAG',
      longDescKey: 'CARD-LONG-RAG',
      categoryKey: 'CAT-AI-NLP',
      categoryClass: 'cat-ai-nlp',
      techs: ['Python', 'LangChain', 'Streamlit', 'Knowledge Graphs', 'Vector DB'],
      githubUrl: 'https://github.com/iago-rhuda/RAG-Retrieval-Augmented-Generation-',
      visitUrl: null,
      visitKey: null,
      isFeatured: true,
      isInProgress: true,
    },
    {
      titleKey: 'PROJECT_QUADROTOR_TITLE',
      titleSuffix: null,
      descKey: 'CARD-TEXT-QUADROTOR',
      longDescKey: 'CARD-LONG-QUADROTOR',
      categoryKey: 'CAT-ROBOTICS',
      categoryClass: 'cat-desktop',
      techs: ['UAV Dynamics', 'State Estimation', 'Control Theory', 'PIBIC'],
      githubUrl: 'https://github.com/iago-rhuda',
      visitUrl: null,
      visitKey: null,
      isFeatured: false,
      isInProgress: false,
    },
    {
      titleKey: 'PERSONAL-PORTFOLIO',
      titleSuffix: 'v2',
      descKey: 'CARD-TEXT-V2',
      longDescKey: 'CARD-LONG-V2',
      categoryKey: 'CAT-WEB',
      categoryClass: 'cat-web',
      techs: ['Angular', 'TypeScript', 'SSR/Prerender', 'i18n', 'CSS3'],
      githubUrl: 'https://github.com/iago-rhuda/portfolio-site-2.0',
      visitUrl: 'https://iagoramos.com',
      visitKey: 'LIVE_DEMO',
      isFeatured: false,
      isInProgress: false,
    },
  ];

  projects: Project[] = [...this.SOURCE];

  // ── Modal state ──────────────────────────────────────────────
  selectedProject: Project | null = null;
  modalVisible = false;

  openProject(project: Project, event: Event): void {
    // Prevent drag-clicks from opening modal
    event.stopPropagation();
    this.selectedProject = project;
    this.modalVisible = true;
    this.pauseAutoPlay();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.modalVisible = false;
    // Delay clearing so exit animation plays
    setTimeout(() => {
      this.selectedProject = null;
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

  private get track(): HTMLDivElement {
    return this.trackRef.nativeElement;
  }

  private isScrolling = false;
  private autoPlayTimer: any;
  private isUserInteracting = false;
  private isDragging = false;
  private dragStartX = 0;
  private readonly AUTO_PLAY_INTERVAL = 4000;

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.zone.runOutsideAngular(() => {
      this.startAutoPlay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  // ── Drag detection (distinguish tap from drag) ───────────────
  onPointerDown(event: PointerEvent): void {
    this.dragStartX = event.clientX;
    this.isDragging = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (Math.abs(event.clientX - this.dragStartX) > 6) {
      this.isDragging = true;
    }
  }

  onCardClick(project: Project, event: Event): void {
    if (!this.isDragging) {
      this.openProject(project, event);
    }
    this.isDragging = false;
  }

  // ── Infinite loop logic ────────────────────────────────────
  private jumpToMiddle(): void {
    const el = this.track;
    const oneSetWidth = this.getOneSetWidth();
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = oneSetWidth;
    requestAnimationFrame(() => {
      el.style.scrollBehavior = '';
    });
  }

  onScroll(): void {}

  private getOneSetWidth(): number {
    return Math.round(this.track.scrollWidth / 3);
  }

  private getCardScrollAmount(): number {
    const el = this.track;
    const card = el.querySelector('.project-card') as HTMLElement;
    if (!card) return 360;
    const gap = parseFloat(getComputedStyle(el).columnGap || '28');
    return card.offsetWidth + gap;
  }

  scrollLeft(): void {
    this.pauseAutoPlay();
    this.track.scrollBy({ left: -this.getCardScrollAmount(), behavior: 'smooth' });
  }

  scrollRight(): void {
    this.pauseAutoPlay();
    this.track.scrollBy({ left: this.getCardScrollAmount(), behavior: 'smooth' });
  }

  // ── Auto-play ──────────────────────────────────────────────
  private startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => {
      if (!this.isUserInteracting) {
        this.track.scrollBy({ left: this.getCardScrollAmount(), behavior: 'smooth' });
      }
    }, this.AUTO_PLAY_INTERVAL);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
  }

  pauseAutoPlay(): void {
    this.isUserInteracting = true;
    this.stopAutoPlay();
  }

  resumeAutoPlay(): void {
    this.isUserInteracting = false;
    this.zone.runOutsideAngular(() => this.startAutoPlay());
  }

  @HostListener('window:resize')
  onResize(): void {
    
  }
}

interface Project {
  titleKey: string;
  titleSuffix: string | null;
  descKey: string;
  longDescKey: string;
  categoryKey: string;
  categoryClass: string;
  techs: string[];
  githubUrl: string | null;
  visitUrl: string | null;
  visitKey: string | null;
  isFeatured?: boolean;
  isInProgress?: boolean;
}
