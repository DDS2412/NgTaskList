import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";
import { Observable } from "rxjs";
import { InitializerService } from "src/app/services/initializer.service";
import { ListInfo } from "src/app/models/listInfo";

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
  listsInfo: Observable<[ListInfo[]]>;
  listInfo: ListInfo[];

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
    this.listsInfo = this.initializerService.listsInfo;
    this.listsInfo.subscribe(data => {
      this.listInfo = data[this.index];
    });
  }

  slicePriority(str: string): string {
    let res = str.split(": ");
    return res.length > 1 ? res[1] : res[0];
  }

  findListName(card: Card): string {
    return this.listInfo.find(x => (x.id === card.idList)).name;
  }
  sendSelected() {
    this.selectedEvent.emit(this.selected);
  }
}
