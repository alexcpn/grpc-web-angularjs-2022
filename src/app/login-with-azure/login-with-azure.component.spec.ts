import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithAzureComponent } from './login-with-azure.component';

describe('LoginWithAzureComponent', () => {
  let component: LoginWithAzureComponent;
  let fixture: ComponentFixture<LoginWithAzureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithAzureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithAzureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
