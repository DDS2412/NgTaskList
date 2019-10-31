import { Component, Input, OnInit } from "@angular/core";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-new-card-modal-window",
  templateUrl: "./new-card-modal-window.component.html",
  styleUrls: ["./new-card-modal-window.component.scss"]
})
export class NewCardModalWindowComponent implements OnInit {
  @Input() modalWindowName: string;

  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  closeModal() {
    this.modalService.close(this.modalWindowName);
  }
}
