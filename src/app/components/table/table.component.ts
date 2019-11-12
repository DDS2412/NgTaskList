import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { APIService } from "../../services/api.service";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";
import { UserInfo } from "../../models/userInfo";
import { ActivatedRoute } from "@angular/router";

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
  selected = [];
  userInfo: UserInfo;
  boardList: Array<Card[]> = new Array<Card[]>();
  @Input() index: Number;

  @Output() selectedEvent = new EventEmitter<any[]>();

  constructor(
    private apiService: APIService,
    private filterService: FilteringService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { userInfo: UserInfo }) => {
      this.userInfo = data.userInfo;
    });
    this.addCardsToBoardList();
  }

  addCardsToBoardList() {
    this.userInfo.idBoards.forEach(element => {
      this.apiService.getCards(element).subscribe((data: Card[]) => {
        this.boardList.push(data);
      });
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
