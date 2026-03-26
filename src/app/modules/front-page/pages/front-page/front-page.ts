import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Tooltip } from '@core-components';

import { HorizontalScroll } from '../../components/horizontal-scroll/horizontal-scroll';
import { ProjectTabs } from '../../components/project-tabs/project-tabs';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-front-page',
  imports: [HorizontalScroll, ProjectTabs, Footer, MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, Tooltip],
  templateUrl: './front-page.html',
  styleUrls: ['./front-page.css', '../../../navbar/navbar/navbar.css'],
})
export class FrontPage {
  private popoverTimers: { [key: string]: any } = {};

  onPopoverMouseEnter(popoverRef: string) {
    // @ts-ignore
    const popover = this[popoverRef];
    if (popover && popover.open) {
      clearTimeout(this.popoverTimers[popoverRef]);
      popover.open();
    }
  }

  onPopoverMouseLeave(popoverRef: string) {
    // @ts-ignore
    const popover = this[popoverRef];
    if (popover && popover.close) {
      this.popoverTimers[popoverRef] = setTimeout(() => popover.close(), 100);
    }
  }
}
