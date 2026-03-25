import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherIdeas } from './other-ideas';

describe('OtherIdeas', () => {
  let component: OtherIdeas;
  let fixture: ComponentFixture<OtherIdeas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherIdeas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherIdeas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
