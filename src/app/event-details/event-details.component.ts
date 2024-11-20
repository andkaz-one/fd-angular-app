import { TableModule } from 'primeng/table';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPropertyNamePipe } from '../format-prop.pipe';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule ,TableModule, FormatPropertyNamePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  private dialogConfig = inject(DynamicDialogConfig);

  detailsData = this.dialogConfig.data;
}


