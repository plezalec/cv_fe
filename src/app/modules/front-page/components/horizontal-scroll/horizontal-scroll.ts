// gallery.component.ts - Angular 21 standalone
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.html',
  styleUrls: ['./horizontal-scroll.css'],
})
export class HorizontalScroll implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private scrollSub?: Subscription;
  
  images = [    
  'xai-tmp-imgen-2bdcfbd2-abfd-4cb9-ab3d-13eb2eddc2a0.webp',
  'xai-tmp-imgen-4bdc88b0-1568-4811-8803-ae5a504deb36.webp',
  'xai-tmp-imgen-4fd47b5a-2dba-4417-97bc-8b0a46d4ebe0.webp',
  'xai-tmp-imgen-6c62b9e3-b9c1-4d3a-8cf5-931dde85642e.webp',
  'xai-tmp-imgen-65e23392-b4db-4372-90f3-5fb084f437aa.jpeg',
  'xai-tmp-imgen-e44d5eb7-84c9-4faa-acf3-923a629b4477.jpeg',
  'xai-tmp-imgen-71acb706-bfb4-40f3-b44e-e5343269a914.webp',
  'xai-tmp-imgen-ba30b3c9-a383-45a0-bf3c-4d09de7a4b95.webp',
  'xai-tmp-imgen-cd685b21-dca4-462f-b0c2-f51c7b49db46.webp',
  'xai-tmp-imgen-f10863fa-fdec-44ed-ab96-57066b971845.webp',
  'xai-tmp-imgen-fb824d6d-f8ea-4655-a06c-7dca41f1714e.webp'
  ];
  loopedImages = [...this.images, ...this.images];

  enlargedImage: string | null = null;
  overlayActive = false;

  ngAfterViewInit() {
    this.startScrolling();
  }

  startScrolling() {
    const container = this.scrollContainer.nativeElement;
    const track = container.querySelector('.gallery-track')!;
    const maxScroll = track.scrollWidth / 2;
    this.scrollSub = interval(30).subscribe(() => {
      container.scrollLeft += 0.5;
      if (container.scrollLeft >= maxScroll) container.scrollLeft = 0;
    });
  }

  stopScrolling() {
    this.scrollSub?.unsubscribe();
    this.scrollSub = undefined;
  }

  onImageClick(img: string) {
    this.stopScrolling();
    this.enlargedImage = img;
    this.overlayActive = true;
  }

  closeEnlarged() {
    this.enlargedImage = null;
    this.overlayActive = false;
    this.startScrolling();
  }

  // Listen for Escape key to close overlay
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.overlayActive) {
      this.closeEnlarged();
    }
  }

  // Called from template overlay click
  onOverlayClick(event: MouseEvent) {
    // Only close if click is on overlay, not image
    if ((event.target as HTMLElement).classList.contains('enlarge-overlay')) {
      this.closeEnlarged();
    }
  }

  ngOnDestroy() { this.scrollSub?.unsubscribe(); }
}
