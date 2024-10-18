import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Sculpture = {
  id: number;
  name: string;
  material: 'wood' | 'metal' | 'stone';
  position: [number, number];
  description: string;
  imageUrl: string;
};

const sculptures: Sculpture[] = [
  {
    id: 1,
    name: "Ángel Mío",
    material: "wood",
    position: [-27.4382319, -58.9810926],
    description: "Escultura tallada en madera que representa la importancia del agua en la región.",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMThd2uoYMSpMOCMpZt3VRdK3FauZWPCJ9YKhnk=w408-h544-k-no"
  },
  {
    id: 2,
    name: "Chacoachasol",
    material: "metal",
    position: [-27.439698, -58.982668],
    description: "Obra en metal que simboliza la transformación y el cambio constante.",
    imageUrl: "/esfera.jpg"
  },
  {
    id: 3,
    name: "Sexto Sol",
    material: "stone",
    position: [-27.4406367, -58.9837607],
    description: "Escultura en piedra que evoca las raíces y la historia de la región.",
    imageUrl: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhE2ukgH1o8P8S3k4uORu63BGvFOJGMpU1REbD7eLhBx_EUlDBxqgSNMr5i5pNsRaPivrXfAx3qiJnmxwN4vhy4CHk0GPXRTZ2vt5rKp0Fy3eRnr4ve2bz-AbdgpQNiNR2xdvBnLZnP3OO2vSr8M39y0Yz7lpEBhsIfkA8SonFYeKTHyMPQ8NEc2c4MCjK4YNDCeX90=w408-h306-k-no"
  },
];

const ramblaPath: [number, number][] = [
  [-27.440733, -58.983772],
  [-27.438215, -58.981166],
  [-27.437608, -58.981172],
];

export default function RamblaMap() {
  const [selectedSculpture, setSelectedSculpture] = useState<Sculpture | null>(null);

  const getMarkerColor = (material: string) => {
    switch (material) {
      case 'wood': return '#D4A373';
      case 'metal': return '#457B9D';
      case 'stone': return '#6B705C';
      default: return '#000000';
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] rounded-lg overflow-hidden shadow-xl shadow-black/30 z-10">
      <MapContainer 
        center={[-27.440733, -58.983772]} 
        zoom={17} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Polyline 
          positions={ramblaPath}
          pathOptions={{ color: '#1D3557', weight: 5, opacity: 0.7 }}
        />
        {sculptures.map((sculpture) => (
          <CircleMarker
            key={sculpture.id}
            center={sculpture.position}
            radius={8}
            pathOptions={{
              color: getMarkerColor(sculpture.material),
              fillColor: getMarkerColor(sculpture.material),
              fillOpacity: 1
            }}
            eventHandlers={{
              click: () => setSelectedSculpture(sculpture),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{sculpture.name}</h3>
                <p className="text-sm italic">{sculpture.material}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      {selectedSculpture && (
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-2xl shadow-black/20 max-w-md mx-auto z-[999]">
          <h2 className="text-xl font-bold mb-2">{selectedSculpture.name}</h2>
          <img src={selectedSculpture.imageUrl} alt={selectedSculpture.name} className="w-full h-40 object-cover mb-2 rounded" />
          <p className="text-sm mb-2">{selectedSculpture.description}</p>
          <p className="text-xs italic">Material: {selectedSculpture.material}</p>
          <button
            onClick={() => setSelectedSculpture(null)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}