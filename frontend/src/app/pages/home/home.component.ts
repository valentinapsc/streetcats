import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';
import { CatService, Cat } from '../../services/cat.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getCats().subscribe({
      next: cats => {
        this.cats = cats;
        console.log('Gatti ricevuti:', cats);
      },
      error: err => console.error(err)
    });
  }
}