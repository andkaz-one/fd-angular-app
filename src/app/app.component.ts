import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly eventsService: EventService = inject(EventService);

  isLoading = this.eventsService.isLoadingSignal;
  
  title = 'iot-event-list';

  menuItems: MenuItem[] = [
    {
      label: 'Events List',
      routerLink: 'events',
      routerLinkActiveOptions: {exact: true}
    }
  ]
}
