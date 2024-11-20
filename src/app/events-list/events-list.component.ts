import {Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {EventService} from '../service/event.service';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {ProgressBarModule} from 'primeng/progressbar';
import {IEvent} from '../interfaces';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EventDetailsComponent} from '../event-details/event-details.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, ProgressBarModule],
  providers: [DialogService],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  private readonly eventService: EventService = inject(EventService);
  private readonly dialogService: DialogService = inject(DialogService);

  // Provide modal window reference
  modalRef: DynamicDialogRef | undefined;

  // Fetch data from service
  public data$ = this.eventService.data$;

  /**
   * Display details about an event in a modal window
   *
   * @param item {IEvent}
   * @returns {void}
   */
  showDetails(item: IEvent): void {
    const event = {...item};

    //Check if the event type is 'doorUnlocked'
    if (event.type === 'doorUnlocked') {
      // Convert unlockDate from unix timestamp to date string
      let parsedData = new Date(event.evtData.unlockDate as number * 1000).toLocaleString();
      event.evtData.unlockDate = parsedData;
    }

    //Open modal window with EventDetailsComponent
    this.modalRef = this.dialogService.open(EventDetailsComponent, {
      header: `Device: ${item.deviceId}; Event: ${item.type}`,  // header text
      data: event.evtData, // Pass data to the component
      modal: true // Disable backgroun app
    });
  }
}
