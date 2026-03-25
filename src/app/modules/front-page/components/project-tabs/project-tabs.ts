
import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {AsyncPipe, NgComponentOutlet} from '@angular/common';


import { ARSO } from './components/arso/arso';
import { LaserCutting } from './components/laser-cutting/laser-cutting';
import { SlicerSoftware } from './components/slicer-software/slicer-software';
import { OtherIdeas } from './components/other-ideas/other-ideas';

export interface ExampleTab {
  label: string;
  component: any;
}

@Component({
  selector: 'app-project-tabs',
  imports: [MatTabsModule, AsyncPipe, NgComponentOutlet, LaserCutting, SlicerSoftware, ARSO, OtherIdeas],
  templateUrl: './project-tabs.html',
  styleUrl: './project-tabs.css',
})
export class ProjectTabs {
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Laser cutting', component: LaserCutting},
          {label: 'Slicer software', component: SlicerSoftware},
          {label: 'Work at ARSO', component: ARSO},
          {label: 'Other ideas', component: OtherIdeas},
        ]);
      }, 1000);
    });
  }
}
