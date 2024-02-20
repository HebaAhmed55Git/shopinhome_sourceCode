import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshLayoutComponent } from './fresh-layout.component';

describe('FreshLayoutComponent', () => {
  let component: FreshLayoutComponent;
  let fixture: ComponentFixture<FreshLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FreshLayoutComponent]
    });
    fixture = TestBed.createComponent(FreshLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
