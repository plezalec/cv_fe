import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAvatar } from './agent-head';

describe('AgentAvatar', () => {
  let component: AgentAvatar;
  let fixture: ComponentFixture<AgentAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
