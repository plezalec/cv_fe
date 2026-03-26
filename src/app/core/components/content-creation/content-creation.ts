
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-content-creation',
  imports: [],
  templateUrl: './content-creation.html',
  styleUrl: './content-creation.css',
})
export class ContentCreation implements AfterViewInit {
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (this.myVideo && this.myVideo.nativeElement) {
      this.myVideo.nativeElement.muted = true;
    }
  }
}
