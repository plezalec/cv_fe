import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { HorizontalScroll } from '../../components/horizontal-scroll/horizontal-scroll';
import { ProjectTabs } from '../../components/project-tabs/project-tabs';


@Component({
  selector: 'app-front-page',
  imports: [HorizontalScroll, ProjectTabs, MatIconModule, MatButtonModule, MatToolbarModule, RouterLink],
  templateUrl: './front-page.html',
  styleUrls: ['./front-page.css', '../../../navbar/navbar/navbar.css'],
})
export class FrontPage {

}
