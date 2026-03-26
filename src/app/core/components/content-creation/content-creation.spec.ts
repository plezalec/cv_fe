import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreation } from './content-creation';

describe('ContentCreation', () => {
  let component: ContentCreation;
  let fixture: ComponentFixture<ContentCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
