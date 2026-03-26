
import {Component, ChangeDetectorRef} from '@angular/core';
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
  styleUrls: ['./project-tabs.css', './project-tabs.scss'],
})
export class ProjectTabs {
  asyncTabs: Observable<ExampleTab[]>;
  selectedTabIndex = 0;
  private initialized = false;
  private firstTabChange = true;

  constructor(private cdr: ChangeDetectorRef) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Laser cutting', component: LaserCutting},
          {label: 'Slicer software', component: SlicerSoftware},
          {label: 'Work at ARSO', component: ARSO},
          {label: 'Other ideas', component: OtherIdeas},
        ]);
        // Restore selected tab index from storage after tabs are loaded
        const storedTab = localStorage.getItem('projectTabs_selectedTab');
        if (storedTab !== null) {
          setTimeout(() => {
            this.selectedTabIndex = +storedTab;
            this.cdr.detectChanges();
          });
        }
        this.initialized = true;
      }, 1000);
    });

    // Restore scroll position after navigation
    setTimeout(() => {
      const scrollY = localStorage.getItem('projectTabs_scrollY');
      if (scrollY) {
        window.scrollTo(0, +scrollY);
      }
    }, 0);
  }

  onTabChange(index: number) {
    // Prevent the first (spurious) change event from resetting the tab
    if (this.firstTabChange) {
      this.firstTabChange = false;
      return;
    }
    if (!this.initialized) return;
    this.selectedTabIndex = index;
    localStorage.setItem('projectTabs_selectedTab', index.toString());
  }
}
