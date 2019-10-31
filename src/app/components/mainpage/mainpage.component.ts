import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  selected = [];
  cards;

  constructor(private apiService: APIService, private modalService: ModalService) {}

  ngOnInit() {
    this.apiService.getCards().subscribe(data => {
      console.log(data);
      console.log(JSON.stringify(data));
      this.cards = data;
    });
  }

  onAdd() {}
  onEdit() {}
  onDelete() {}

  formatDate(str: string) {
    return (
      new Date(str).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }) +
      ', ' +
      new Date(str).toLocaleDateString('en-GB', {
        month: 'long',
        day: 'numeric'
      })
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
