import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorChatHtml } from './tutor-chat-html';

describe('TutorChatHtml', () => {
  let component: TutorChatHtml;
  let fixture: ComponentFixture<TutorChatHtml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorChatHtml]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
