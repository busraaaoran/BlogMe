import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArticlesComponent } from './show-articles.component';

describe('ShowArticlesComponent', () => {
  let component: ShowArticlesComponent;
  let fixture: ComponentFixture<ShowArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
