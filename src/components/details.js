import { ScrollView, SafeAreaView, StatusBar, View, StyleSheet, Text, Image, Dimensions, ActivityIndicator } from "react-native"
import * as React from 'react'
import { useState, useEffect } from "react/cjs/react.development"

export const Details = (props) => {
    const [dog, setDog] = useState(null);
    const [image, setImage] = useState(null)
    const {id, url, type, imageId}=props.route.params;

    
    useEffect(()=>{
        const fetchAnimal = async () => {
            const response = type==='dog' ? await fetch(`https://api.thedogapi.com/v1/breeds/${id}`): await fetch(`https://api.thecatapi.com/v1/breeds/${id}`)
            const json = await response.json();
            setDog(json)
        }

        fetchAnimal()

        const getAnimalImage= async () =>{
                const response = type=== 'cat' ? await fetch(`https://api.thecatapi.com/v1/images/${imageId}`) : await fetch(`https://api.thedogapi.com/v1/images/${imageId}`)
                const json = await response.json()
                setImage(json.url)
        }
        getAnimalImage()
    },[])

    const avaliateNeeds = (val) => {
        if(val===5){
            return 'Very Much'
        }else if(val===4){
            return 'Yes'
        }else if( val===3){
            return 'Average'
        }else if(val===2){
            return 'Not much'
        }else if(val===1){
            return 'No!'
        }else{
            return 'Not available!'
        }
    }

    if(!dog || !type){
        return <ActivityIndicator size="small" color="#0000ff" />
    }

    if(type==='cat'){
        return(
            <SafeAreaView style={styles.layout}>
            <ScrollView>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{dog.name}</Text>
                    <Text><Text style={styles.span}>{dog.weight.metric}</Text> kg </Text>
                </View>
                <Image 
                    style={styles.image}
                    source={{uri: image}}/>
                <View>
                    <Text style={styles.heading}>Characteristics</Text>
                    <Text><Text style={styles.span}>Description:</Text> {dog.description}</Text>
                    <Text><Text style={styles.span}>Expected life:</Text> {dog.life_span}</Text>
                    <Text><Text style={styles.span}>Temperament:</Text> {dog.temperament}</Text>
                    <Text><Text style={styles.span}>Good to have indoor?</Text> {dog.indoor=== 1 ? 'No' : 'Yes'}</Text>
                    <Text><Text style={styles.span}>Children friendly:</Text> {avaliateNeeds(dog.child_friendly)}</Text>
                    <Text><Text style={styles.span}>Dog friendly:</Text> {avaliateNeeds(dog.dog_friendly)}</Text>
                    <Text><Text style={styles.span}>Health issues:</Text> {avaliateNeeds(dog.health_issues)}</Text>
                    <Text><Text style={styles.span}>Social needs:</Text> {avaliateNeeds(dog.social_needs)}</Text>
                    <Text><Text style={styles.span}>Original from:</Text> {dog.origin}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
    return(
        <SafeAreaView style={styles.layout}>
            <ScrollView>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{dog.name}</Text>
                    <Text><Text style={styles.span}>{dog.height.metric}</Text> cm  </Text>
                    <Text><Text style={styles.span}>{dog.weight.metric}</Text> kg </Text>
                </View>
                <Image 
                    style={styles.image}
                    source={{uri: image}}/>
                <View>
                    <Text style={styles.heading}>Characteristics</Text>
                    <Text><Text style={styles.span}>Bred for:</Text> {dog.bred_for}</Text>
                    <Text><Text style={styles.span}>Breed group:</Text> {dog.breed_group}</Text>
                    <Text><Text style={styles.span}>Expected life:</Text> {dog.life_span}</Text>
                    <Text><Text style={styles.span}>Temperament:</Text> {dog.temperament}</Text>
                    <Text><Text style={styles.span}>Original from:</Text> {dog.origin}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    layout:{
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer:{
        
    },
    image:{
        height: Dimensions.get('window').height* (9/16),
        width: Dimensions.get('window').width,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    heading:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    span:{
        fontWeight: 'bold'
    }
})