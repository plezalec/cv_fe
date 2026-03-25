import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicerSoftware } from './slicer-software';

describe('SlicerSoftware', () => {
  let component: SlicerSoftware;
  let fixture: ComponentFixture<SlicerSoftware>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlicerSoftware]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlicerSoftware);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
