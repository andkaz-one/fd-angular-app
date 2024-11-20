import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppComponent } from './app.component';
import { EventService } from './service/event.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterOutlet, MenubarModule, ProgressBarModule],
      providers: [
        {
          provide: EventService,
          useValue: {
            isLoadingSignal: of(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the menu item', () => {
    const menuItemElement: HTMLElement = fixture.nativeElement.querySelector('p-menubaritem');
    expect(menuItemElement.textContent).toContain('Events List');
  });

  it('should display the progress bar when loading', () => {
    eventService.isLoadingSignal.set(true);
    fixture.detectChanges();

    const progressBarElement: HTMLElement = fixture.nativeElement.querySelector('p-progressBar');
    expect(progressBarElement).toBeTruthy();
  });
});