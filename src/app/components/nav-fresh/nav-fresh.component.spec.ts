import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFreshComponent } from './nav-fresh.component';

describe('NavFreshComponent', () => {
  let component: NavFreshComponent;
  let fixture: ComponentFixture<NavFreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavFreshComponent]
    });
    fixture = TestBed.createComponent(NavFreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
