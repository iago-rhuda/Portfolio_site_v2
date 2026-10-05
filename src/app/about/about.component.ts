import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public translate: TranslateService) { }

  public calculateAge(): number {
    const birthDate = new Date(2003, 1, 7);
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
  }

  public hobbies = [
    {
      icon: 'bi-rocket-takeoff',
      key: 'HOBBY-1',
      topics: [
        { label: 'HOBBY-1-TOPIC-1-LABEL', value: 'HOBBY-1-TOPIC-1-VALUE' },
        { label: 'HOBBY-1-TOPIC-2-LABEL', value: 'HOBBY-1-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-cpu',
      key: 'HOBBY-2',
      topics: [
        { label: 'HOBBY-2-TOPIC-1-LABEL', value: 'HOBBY-2-TOPIC-1-VALUE' },
        { label: 'HOBBY-2-TOPIC-2-LABEL', value: 'HOBBY-2-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-grid-3x3',
      key: 'HOBBY-3',
      topics: [
        { label: 'HOBBY-3-TOPIC-1-LABEL', value: 'HOBBY-3-TOPIC-1-VALUE' },
        { label: 'HOBBY-3-TOPIC-2-LABEL', value: 'HOBBY-3-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-music-note-beamed',
      key: 'HOBBY-4',
      topics: [
        { label: 'HOBBY-4-TOPIC-1-LABEL', value: 'HOBBY-4-TOPIC-1-VALUE' },
        { label: 'HOBBY-4-TOPIC-2-LABEL', value: 'HOBBY-4-TOPIC-2-VALUE' }
      ]
    }
  ];
}
