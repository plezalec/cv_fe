import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserCutting } from './laser-cutting';

describe('LaserCutting', () => {
  let component: LaserCutting;
  let fixture: ComponentFixture<LaserCutting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaserCutting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaserCutting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
