import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoShop } from './demo-shop';

describe('DemoShop', () => {
  let component: DemoShop;
  let fixture: ComponentFixture<DemoShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoShop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
