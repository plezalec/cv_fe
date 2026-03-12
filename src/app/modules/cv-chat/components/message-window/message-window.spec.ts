import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWindow } from './message-window';

describe('MessageWindow', () => {
  let component: MessageWindow;
  let fixture: ComponentFixture<MessageWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageWindow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
