import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialButton } from './special-button';

describe('SpecialButton', () => {
  let component: SpecialButton;
  let fixture: ComponentFixture<SpecialButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
