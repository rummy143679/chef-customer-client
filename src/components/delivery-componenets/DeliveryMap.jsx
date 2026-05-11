import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const deliveryBoyIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743007.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45],
});

const destinationIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45],
});

function Routing({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      createMarker: (i, wp) => {
        return i === 0
          ? L.marker(wp.latLng, { icon: deliveryBoyIcon }).bindPopup(
              "Delivery Boy",
            )
          : L.marker(wp.latLng, { icon: destinationIcon }).bindPopup(
              "Destination",
            );
      },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(control);
  }, [origin, destination]);

  return null;
}

function DeliveryMap({ origin, destination }) {
  if (!origin || !destination) return null;

  return (
    <MapContainer
      center={origin}
      zoom={14}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Routing origin={origin} destination={destination} />
    </MapContainer>
  );
}
export default DeliveryMap;
