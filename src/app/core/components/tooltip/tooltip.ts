import { Component, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule],
  templateUrl: './tooltip.html',
  styleUrls: ['./tooltip.css'],
})
export class Tooltip {
  @Input() popover!: TemplateRef<any>;
  @Input() keyword = '';
  private insidePopover = false;
  private closeTimeout: any;

  onTriggerEnter(pop: any) {
    clearTimeout(this.closeTimeout);
    pop.open();
  }
  onTriggerLeave(pop: any) {
    this.closeTimeout = setTimeout(() => {
      if (!this.insidePopover) {
        pop.close();
      }
    }, 300);
  }
  onPopoverEnter(pop: any) {
    clearTimeout(this.closeTimeout);
    this.insidePopover = true;
    pop.open();
  }
  onPopoverLeave(pop: any) {
    this.insidePopover = false;
    pop.close();
  }
  onPopoverShown(pop: any) {
    // Optionally handle when popover is shown
  }
  onPopoverHidden(pop: any) {
    // Optionally handle when popover is hidden
    this.insidePopover = false;
    clearTimeout(this.closeTimeout);
  }
}
