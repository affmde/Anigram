import { ScrollView, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, Text, Button, Image } from "react-native"
import { useEffect, useState } from "react/cjs/react.development"
import { dogFacts } from "../dogFacts"

export const Facts = () => {
    const [fact, setFact] = useState(dogFacts)
    const [index, setIndex] = useState(Math.floor(Math.random()*fact.length))
    const [image, setImage] = useState(null)

    useEffect(()=>{
        fetchImage()
    }, [])
    
    
    const changeFact = () => {
        const randomIndex = Math.floor(Math.random()*fact.length)
        setIndex(randomIndex);
    }
    const fetchImage = async () => {
        const response =  await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1')
        const json = await response.json()
        setImage(json[0])
    }

    if(!fact || !image){
        return <ActivityIndicator size="small" color="#0000ff" />
    }
    return(
        <SafeAreaView style={styles.layout}>
            <Text style={styles.heading}>Dog Facts</Text>
            <ScrollView style={{padding: 50}}>
                <Image
                    style={styles.image}
                    source={{uri: image.url}}/>
                <Text style={styles.text}>{fact[index].fact} </Text>
                <Button
                    title="Change fact" 
                    onPress={changeFact}
                    style={styles.button}></Button>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles= StyleSheet.create({
    layout:{
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'flex-end',
    },
    heading:{
        fontSize: 30,
        textAlign: "center",
        marginTop: 20
    },
    text:{
        lineHeight: 30,
        fontSize: 18,
        minHeight: 150
    },
    image:{
        height: 150
    },
    button:{

    }

})