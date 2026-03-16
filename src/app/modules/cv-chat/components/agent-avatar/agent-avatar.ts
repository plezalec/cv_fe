import { Component, ViewChild, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'app-agent-avatar',
  imports: [],
  templateUrl: './agent-avatar.html',
  styleUrl: './agent-avatar.css',
})
export class AgentAvatar {
  @ViewChild('agentAvatar', { static: true }) agentAvatar!: ElementRef<HTMLDivElement>;

  isStreaming = signal<boolean>(false);

  setIsStreaming(value: boolean) {
    this.isStreaming.set(value);
  }

  setAbsolutePosition(x: number, y: number) {
    const element = this.agentAvatar.nativeElement;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }
}
