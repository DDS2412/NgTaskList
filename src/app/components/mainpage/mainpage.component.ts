import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"]
})
export class MainpageComponent implements OnInit {
  selected = [];

  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  receiveSelected($event) {
    this.selected = $event;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
