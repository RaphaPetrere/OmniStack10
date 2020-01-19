import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import  MapView, { Marker, Callout }  from 'react-native-maps'; //n precisa de { } pq é a exportação padrão dele
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
//requestPermissionAsync pede permissão pro usuario pra utilizar a localização dele
//getCurrentPositionAsync pega a posição atual do usuário

import api from '../services/api';

function Main({ navigation }){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition()
        {
            const { granted } = await requestPermissionsAsync(); //granted = se deu permissão ou não
        
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy : true, //se quiser utilizar o GPS do celular e ele estiver habilitado
                });
                // const location = await getCurrentPositionAsync({
                //     enableHighAccuracy : true, //se quiser utilizar o GPS do celular e ele estiver habilitado
                // });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta : 0.04,
                    longitudeDelta : 0.04,  //Delta são calculos navais pra obter o zoom no mapa
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        console.log(response.data.devs);
        setDevs(response.data.devs);
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null; //só vai mostrar o mapa no momento q carregar a informação do useEffect
    }

    return (
        <>
        
        <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
        {devs.map(dev => (
            <Marker 
            key={dev._id}
            coordinate={{ 
                longitude : dev.location.coordinates[0],
                latitude : dev.location.coordinates[1], 
                }}>
            <Image style={styles.avatar} 
                   source={{ uri : dev.avatar_url }} />
            
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username : dev.github_username });
            }}> 
                {/* Tudo q colocar dentro dele é oq vai aparecer quando clicar no avatar */}
                <View style={styles.callout}>
                    <Text style={styles.devName}>{dev.name}</Text>
                    <Text style={styles.devBio}>{dev.bio}</Text>
                    <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
            </Callout>
        </Marker>
        /* passa latitude e longitude */
        ))}
        </MapView>
        {/* Quando se quer colocar um elemento acima de um mapa, vc coloca dps do MapView */}
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words" //a 1° letra de cada palavra como caixa alta
                autoCorrect={false} //pra n tentar corrigir o texto colocado nesse input
                value={techs}
                onChangeText={setTechs}
            />

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
    )
    
    // return <MapView style={{ flex : 1 }} />    
    //2 chaves pq no reactNative as estilizações são feitas em formato de objeto
}

const styles = StyleSheet.create({
    map : {
        flex : 1 
    },

    avatar : {
        width : 54,
        height : 54,
        borderRadius : 4,
        borderWidth : 4,
        borderColor : "#FFF"
    },

    callout : {
        width : 260,
    },

    devName : {
        fontWeight : 'bold',
        fontSize : 16,
    },

    devBio : {
        color : "#666",
        marginTop : 5,
    },

    devTechs : {
        marginTop : 5,
    },

    searchForm : {
        position : 'absolute',
        top : 20,
        left : 20,
        right : 20,
        zIndex : 5,
        flexDirection : 'row',
        //display flex é padrão no reactNative
    },

    searchInput : {
        flex : 1,
        height : 50,
        backgroundColor : "#FFF",
        color : "#333",
        borderRadius : 25,
        paddingHorizontal : 20, //só tem no Reacct Native isso
        fontSize : 16,
        shadowColor : "#000", //esses shadow são pro iOS
        shadowOpacity : 0.2,
        shadowOffset : {
            width : 4,
            height : 4
        },
        elevation : 2, //no android é o elevation

    },

    loadButton : {
        width : 50,
        height : 50,
        backgroundColor : '#8E4Dff',
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 15,
    }
})

export default Main;