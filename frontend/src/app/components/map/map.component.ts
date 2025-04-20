// mappa di Leaflet per visualizzare i gatti

// Importa i moduli necessari
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Cat } from '../../services/cat.service';
import { Icon } from 'leaflet';
delete (Icon.Default.prototype as any)._getIconUrl;  // serve per evitare conflitti con le path di default

Icon.Default.mergeOptions({
  iconUrl: 'assets/images/cat-marker.webp',
  shadowUrl: 'assets/images/marker-shadow.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

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

  ngAfterViewInit(): void { // metodo chiamato dopo che la vista del componente è stata inizializzata (dopo il caricamento del template)
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
    this.map = L.map('map').setView([40.8522, 14.2681], 13); // Coordinate iniziali (Napoli)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.addMarkers();
  }

  private addMarkers(): void {
    // Rimuovi eventuali marker esistenti
    this.markers.forEach(m => this.map?.removeLayer(m));
    this.markers = [];
  
    // Icona personalizzata
    const catIcon = L.icon({
      iconUrl: 'assets/images/cat-marker.webp',
      iconSize:   [38, 38],
      iconAnchor: [19, 38],
      popupAnchor:[0, -38],
      shadowUrl:  'assets/images/marker-shadow.png'  
    });
  
    this.cats.forEach(cat => {
      let popupContent = `<b>${cat.name}</b><br>${cat.description}`;
      if (cat.image) {
        const imageUrl = `http://localhost:3000/uploads/${cat.image}`;
        popupContent += `<br><img src="${imageUrl}" style="max-width:100px;margin-top:5px;">`;
      }
      popupContent += `<br><a href="/cat/${cat.id}">Visualizza dettagli</a>`;
  
      const marker = L.marker([cat.lat, cat.lng], { icon: catIcon })
        .addTo(this.map!)
        .bindPopup(popupContent);
  
      this.markers.push(marker);
    });
  }
}