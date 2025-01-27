import React, {useEffect,useState} from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
const TrackLocationScreen=()=>{

    const [locationB,setLocationB]= useState(null);
    useEffect(()=>{
        const ws=new WebSocket('ws:C:\Users\leolo\Documents\Projects\nestjs-backend\ws')
        ws.onmessage=(message)=>{

            const data=JSON.parse(message.data);
            setLocationB(data.locationB);
        };
        return ()=>ws.close();
    },[]);

    return (
        <View style={{flex:1} }  >
        <MapView
        style={{flex:1}}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
    {locationB && <Marker coordinate={locationB}/>}
        </MapView>
        
        </View>
    );
};
export default TrackLocationScreen;