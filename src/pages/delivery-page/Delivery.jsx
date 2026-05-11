// DeliveryDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import api from "../../middleware/API";
import { toast } from "react-toastify";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import DeliveryMap from "../../components/delivery-componenets/DeliveryMap";

// =====================================================
// MAIN COMPONENT
// =====================================================
function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const liveIntervalRef = useRef(null);

  // Fetch active deliveries
  const fetchDeliveries = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/delivery-boy/active/${user._id}`);
      setDeliveries(res.data.activeDeliveries || []);
    } catch {
      toast.error("Failed to load deliveries");
    }
  };

  useEffect(() => {
    fetchDeliveries();
    return () => stopLiveTracking();
  }, []);

  // Update delivery status
  const updateStatus = async (deliveryId, status, location = null) => {
    try {
      let res;

      if (status === "picked")
        res = await api.put(`/delivery/${deliveryId}/pick`);
      if (status === "on the way")
        res = await api.put(`/delivery/${deliveryId}/start`, location);
      if (status === "reached")
        res = await api.put(`/delivery/${deliveryId}/reached`);
      if (status === "delivered")
        res = await api.put(`/delivery/${deliveryId}/delivered`);

      toast.success(`${status} updated`);
      fetchDeliveries();

      if (status === "on the way") {
        setSelectedDelivery(res.data.delivery);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Start live tracking
  const startLiveTracking = (delivery) => {
    stopLiveTracking();

    const dest = {
      lat: delivery.location.lat,
      lng: delivery.location.lng,
    };

    liveIntervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          setCurrentLocation(loc);
          setRouteData({ origin: loc, destination: dest });

          api.put(`/delivery/${delivery._id}/location`, loc);
        },
        () => {},
        { enableHighAccuracy: true },
      );
    }, 10000);
  };

  const stopLiveTracking = () => {
    if (liveIntervalRef.current) {
      clearInterval(liveIntervalRef.current);
      liveIntervalRef.current = null;
    }
  };

  // Start delivery
  const handleStart = (delivery) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const dest = { lat: delivery.location.lat, lng: delivery.location.lng };
        //api to update the status to on the way and save the current location as well

        setCurrentLocation(loc);
        setRouteData({ origin: loc, destination: dest });
        setSelectedDelivery(delivery);

        localStorage.setItem("activeDelivery", JSON.stringify(delivery));
        localStorage.setItem("liveOrigin", JSON.stringify(loc));
        localStorage.setItem("liveDestination", JSON.stringify(dest));

        updateStatus(delivery._id, "on the way", loc);
        startLiveTracking(delivery);
      },
      () => toast.error("Location blocked"),
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => {
    const savedDelivery = JSON.parse(localStorage.getItem("activeDelivery"));
    const savedOrigin = JSON.parse(localStorage.getItem("liveOrigin"));
    const savedDestination = JSON.parse(
      localStorage.getItem("liveDestination"),
    );

    if (savedDelivery && savedOrigin && savedDestination) {
      setSelectedDelivery(savedDelivery);
      setCurrentLocation(savedOrigin);
      setRouteData({ origin: savedOrigin, destination: savedDestination });
      startLiveTracking(savedDelivery);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">🚚 Active Deliveries</h3>

      <div className="row g-4">
        {deliveries.map((d) => (
          <div key={d._id} className="col-md-6">
            <div className="shadow-sm card p-3 rounded-4 border-0">
              <h5 className="fw-semibold">Order #{d.orderId.orderId}</h5>

              <p className="m-0">
                <b>Customer:</b> {d.customerId.userName}
              </p>
              <p className="m-0">
                <b>Address:</b> {d.customerId.address}
              </p>

              <div className="d-flex gap-2 mt-3">
                {d.deliveryStatus === "not picked" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => updateStatus(d._id, "picked")}
                  >
                    Pick Order
                  </button>
                )}

                {d.deliveryStatus === "picked" && (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleStart(d)}
                  >
                    Start Delivery
                  </button>
                )}

                {d.deliveryStatus === "on the way" && (
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => updateStatus(d._id, "reached")}
                  >
                    Reached
                  </button>
                )}

                {d.deliveryStatus === "reached" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(d._id, "delivered")}
                  >
                    Delivered
                  </button>
                )}
              </div>

              {selectedDelivery &&
                selectedDelivery._id === d._id &&
                routeData &&
                currentLocation && (
                  <div className="mt-3">
                    <DeliveryMap
                      origin={routeData.origin}
                      destination={routeData.destination}
                    />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryDashboard;
