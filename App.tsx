import React, {useEffect} from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';
import  socket  from './components/socket'; // Archivo de configuración para el WebSocket


socket.on('connect', () => {
  console.log('Conectado al servidor WebSocket');
});

socket.on('connect_error', (error) => {
  console.log('Error al conectar:', error);
});

const App = () => {
  
  useEffect(() => {
   
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <MapScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
