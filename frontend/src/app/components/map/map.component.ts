// mappa di Leaflet per visualizzare i gatti

// Importa i moduli necessari
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Cat } from '../../services/cat.service';

@Component({ // decoratore del componente
  // Specifica il selettore del componente, il template e gli stili
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges { // implementa le interfacce AfterViewInit e OnChanges
  // Definisce le proprietà del componente
  @Input() cats: Cat[] = [];
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];

  ngAfterViewInit(): void { // metodo chiamato dopo che la vista del componente è stata inizializzata
    // Inizializza la mappa e aggiungi i marker
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void { // metodo chiamato quando ci sono cambiamenti nelle proprietà del componente
    // Se ci sono cambiamenti nei gatti e la mappa è già inizializzata, aggiungi i marker
    if (changes['cats'] && this.map) {
      this.addMarkers();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.8522, 14.2681], 13); // Coordinate iniziali (es. Napoli)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.addMarkers();
  }

  private addMarkers(): void {
    // Rimuovi eventuali markers esistenti
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Aggiungi un marker per ogni gatto
    this.cats.forEach(cat => {
      const marker = L.marker([cat.lat, cat.lng])
        .addTo(this.map!)
        .bindPopup(`<b>${cat.name}</b><br>${cat.description}`);
      this.markers.push(marker);
    });
  }
}