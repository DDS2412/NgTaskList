import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { APIService } from "../../services/api.service";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private labelFilter = this.filterService.createLabelFilter();
  private assignedPersonFilter = this.filterService.createAssignedPersonFilter();
  private creationDateFilter = this.filterService.createCreationDateFilter();
  private deadlineFilter = this.filterService.createDeadlineFilter();
  selected = [];
  cards: Card[];

  @Output() selectedEvent = new EventEmitter<any[]>();

  constructor(
    private apiService: APIService,
    private filterService: FilteringService
  ) {}

  ngOnInit() {
    this.apiService.getCards().subscribe(data => {
      console.log(data);
      console.log(JSON.stringify(data));
      this.cards = data;
    });
  }

  sendSelected() {
    this.selectedEvent.emit(this.selected);
  }

  onEdit() {}
  onDelete() {}

  formatDate(str: string) {
    return new Date(str).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      day: "numeric"
    });
  }
}
