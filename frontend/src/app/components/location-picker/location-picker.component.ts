import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  template: `<div id="location-picker-map"></div>`,
  styles: [`
    #location-picker-map {
      height: 300px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `]
})
export class LocationPickerComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  ngAfterViewInit(): void {
    this.map = L.map('location-picker-map').setView([40.8522, 14.2681], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ascolta il click sulla mappa
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      if (!this.map) return; // se la mappa è undefined, esci

      // Qui la mappa è definita:
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }
      this.locationSelected.emit({ lat, lng });
      // Comunica la posizione selezionata al componente padre
      this.locationSelected.emit({ lat, lng });
    });
  }
}