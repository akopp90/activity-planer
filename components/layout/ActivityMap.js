import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function ActivityMap({ address, lat, lon }) {
  const position = [lat, lon];
  const icon = L.icon({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
    iconSize: [25, 42],
    iconAnchor: [12.5, 42],
    popupAnchor: [0, -42],
  });

  function MapInstance() {
    const map = useMap();
    map.setView(position, 13);
  }

  return (
    <>
      <StyledParagraph>
        <strong>Location: </strong>
        {address}
      </StyledParagraph>
      <StyledMapContainer scrollWheelZoom={false}>
        <MapInstance />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </StyledMapContainer>
    </>
  );
}

const StyledMapContainer = styled(MapContainer)`
  z-index: 0;
  width: 100%;
  height: 500px;
  border-radius: 8px;
  margin-bottom: 24px;
`;
const StyledParagraph = styled.p`
  margin-bottom: 16px;
`;
