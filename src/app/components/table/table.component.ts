import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";
import { Observable } from 'rxjs';
import { InitializerService } from 'src/app/services/initializer.service';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  private labelFilter = this.filterService.createLabelFilter();
  private assignedPersonFilter = this.filterService.createAssignedPersonFilter();
  private creationDateFilter = this.filterService.createCreationDateFilter();
  private deadlineFilter = this.filterService.createDeadlineFilter();
  selected: Array<Card> = new Array<Card>();
  boardList: Observable<[Card[]]>;
  board: Card[];

  @Input() index;

  @Output() selectedEvent = new EventEmitter<any[]>();

  constructor(
    private filterService: FilteringService,
    private initializerService: InitializerService
  ) {}

  ngOnInit() {
    this.boardList = this.initializerService.cardList;
    this.boardList.subscribe(data => {
      this.board = data[this.index];
    });
  }

  sendSelected() {
    this.selectedEvent.emit(this.selected);
  }
}
