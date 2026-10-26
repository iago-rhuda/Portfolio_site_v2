import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Experience {
  company: string;
  roleKey: string;
  periodKey: string;
  locationKey: string;
  badgeClass: string;
  bulletsKeys: string[];
  techs: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      company: 'Packform',
      roleKey: 'EXP_PACKFORM_ROLE',
      periodKey: 'EXP_PACKFORM_PERIOD',
      locationKey: 'EXP_PACKFORM_LOCATION',
      badgeClass: 'badge-packform',
      bulletsKeys: [
        'EXP_PACKFORM_B1',
        'EXP_PACKFORM_B2',
        'EXP_PACKFORM_B3'
      ],
      techs: ['Python', 'REST APIs', 'Zeev (BPMN)', 'Automation']
    },
    {
      company: 'Irrigate',
      roleKey: 'EXP_IRRIGATE_ROLE',
      periodKey: 'EXP_IRRIGATE_PERIOD',
      locationKey: 'EXP_IRRIGATE_LOCATION',
      badgeClass: 'badge-irrigate',
      bulletsKeys: [
        'EXP_IRRIGATE_B1',
        'EXP_IRRIGATE_B2',
        'EXP_IRRIGATE_B3'
      ],
      techs: ['C/C++', 'ESP32', 'IoT Protocols', 'Sensors']
    },
    {
      company: 'PUCPR',
      roleKey: 'EXP_PUCPR_ROLE',
      periodKey: 'EXP_PUCPR_PERIOD',
      locationKey: 'EXP_PUCPR_LOCATION',
      badgeClass: 'badge-pucpr',
      bulletsKeys: [
        'EXP_PUCPR_B1',
        'EXP_PUCPR_B2'
      ],
      techs: ['Algorithms', 'Data Structures', 'Mentorship']
    }
  ];

  constructor(public translate: TranslateService) {}
}
