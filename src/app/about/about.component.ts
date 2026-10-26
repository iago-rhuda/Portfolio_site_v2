import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public translate: TranslateService) { }

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
      icon: 'bi-compass',
      key: 'HOBBY-PERSONAL',
      topics: [
        { label: 'HOBBY-PERSONAL-TOPIC-1-LABEL', value: 'HOBBY-PERSONAL-TOPIC-1-VALUE' }
      ]
    }
  ];
}
