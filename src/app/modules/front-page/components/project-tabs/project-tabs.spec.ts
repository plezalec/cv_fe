import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTabs } from './project-tabs';

describe('ProjectTabs', () => {
  let component: ProjectTabs;
  let fixture: ComponentFixture<ProjectTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
