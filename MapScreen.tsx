import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'; // Para obtener la ubicación del usuario
import  socket  from './components/socket';
// Definir el tipo para selectedLocation
interface Location {
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 19.56040272016473,
    longitude: -70.86901042610407,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Usamos Location como el tipo de selectedLocation
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Obtener la ubicación actual del usuario al cargar el componente
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  // Manejar el toque en el mapa para seleccionar una ubicación
  const handleMapPress = (event: any) => {  
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  
  };

  const sendLocation = () => {
    console.log('Enviando ubicación:', region);
    socket.emit('sendLocation', { latitude: region.latitude, longitude: region.longitude });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion} // Actualizar la región cuando el usuario mueva el mapa
        onPress={handleMapPress} // Manejar el toque en el mapa
        mapType="standard"
        showsUserLocation={true} // Mostrar la ubicación actual del usuario en el mapa
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Ubicación seleccionada" />
        )}
      </MapView>

      <Button title="Enviar Ubicación" onPress={sendLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
