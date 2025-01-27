import React, {useEffect} from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';
// import LocationSender from './components/LocationSender';
// import LocationReceiver  from './components/LocationReceiver';
import  socket  from './components/socket'; // Archivo de configuración para el WebSocket
// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
//       <MapScreen />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

socket.on('connect', () => {
  console.log('Conectado al servidor WebSocket');
});

socket.on('connect_error', (error) => {
  console.log('Error al conectar:', error);
});

const App = () => {
  
  useEffect(() => {
    // Conectar al WebSocket cuando la app se carga
    socket.connect();

    // Desconectar cuando la app se cierre o se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Muestra el mapa */}
      <MapScreen />
      
      {/* Componente que envía la ubicación
      <LocationSender /> */}

      {/* Componente que recibe y muestra la ubicación */}
      {/* <LocationReceiver /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;