import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { APIService } from "../../services/api.service";
import { ModalService } from "../../services/modal.service";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"]
})
export class MainpageComponent implements OnInit {
  private labelFilter = this.filterService.createLabelFilter();
  private assignedPersonFilter = this.filterService.createAssignedPersonFilter();
  private creationDateFilter = this.filterService.createCreationDateFilter();
  private deadlineFilter = this.filterService.createDeadlineFilter();
  selected = [];
  cards: Card[];

  constructor(
    private apiService: APIService,
    private modalService: ModalService,
    private filterService: FilteringService
  ) {}

  ngOnInit() {
    this.apiService.getCards().subscribe(data => {
      console.log(data);
      console.log(JSON.stringify(data));
      this.cards = data;
    });

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

  openModal(id: string) {
    this.modalService.open(id);
  }
}
