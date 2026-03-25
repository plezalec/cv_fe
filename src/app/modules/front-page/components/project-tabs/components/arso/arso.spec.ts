import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARSO } from './arso';

describe('ARSO', () => {
  let component: ARSO;
  let fixture: ComponentFixture<ARSO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ARSO]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ARSO);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
