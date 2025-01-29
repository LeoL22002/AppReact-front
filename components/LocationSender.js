import React, { useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import socket from './socket';

const LocationSender = () => {
  useEffect(() => {
    // Solicitar permisos cuando el componente se monta
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        return granted === 'granted';
      }

      // Para Android, primero verificamos si ya tenemos el permiso
      const checkPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      
      if (checkPermission) {
        return true;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Esta app necesita acceso a tu ubicación",
          buttonNeutral: "Preguntar después",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Error al solicitar permisos:', err);
      return false;
    }
  };

  const sendLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        console.error('Location permission denied');
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('updateLocation', { latitude, longitude });
          console.log('Coordenadas enviadas:', { latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.code, error.message);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000, 
          maximumAge: 10000,
          forceRequestLocation: true
        }
      );
    } catch (error) {
      console.error('Error en sendLocation:', error);
    }
  };

  return (
    <View>
      <Text>Send Location</Text>
      <Button title="Send Location" onPress={sendLocation} />
    </View>
  );
}

export default LocationSender;