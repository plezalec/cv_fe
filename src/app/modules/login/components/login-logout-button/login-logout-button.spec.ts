import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutButton } from './login-logout-button';

describe('LoginLogoutButton', () => {
  let component: LoginLogoutButton;
  let fixture: ComponentFixture<LoginLogoutButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLogoutButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLogoutButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
