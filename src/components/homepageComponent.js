import { ScrollView, Image, View, StyleSheet, SafeAreaView, StatusBar, Text, TextInput, FlatList, ActivityIndicator, Button} from "react-native"
import { useState, useEffect } from "react/cjs/react.development"
import { Card } from "./card"
import { TopCards } from "./topCards"

export const HomepageComponent = (props) => {
    const [filter, setFilter] = useState('')
    const [animalShow, setAnimalShow] = useState('dog')
    

    if(!props.dogs || !props.cats){
        return <ActivityIndicator size="small" color="#0000ff" />
    }
    const filteredDogs= props.dogs.filter(dog=>dog.name.toLowerCase().includes(filter.toLowerCase()))
    const filteredCats= props.cats.filter(cat=>cat.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <SafeAreaView style={styles.layout}>
            <Image 
                style={styles.topBar}
                source={{uri: 'https://i.postimg.cc/J47K8Tt2/Anigram-removebg-preview.png'}}/>
            <View style={styles.filterContainer}>
                <TextInput
                style={styles.subFilter1}
                    placeholder="filter"
                    value={filter}
                    onChangeText={(text)=>setFilter(text)} />
                    <View style={styles.subFilter2}>
                        <Button
                        color="#841584"
                        title="Dogs"
                        style={styles.subFilter2Button}
                        onPress={()=>setAnimalShow('dog')}/>
                    <Button
                        color="#841584"
                        title="Cats"
                        style={styles.subFilter2Button}
                        onPress={()=>setAnimalShow('cat')}/>
                    </View>
            </View>
            <Text style={styles.heading}>Top Animals</Text>
            <ScrollView horizontal style={styles.topCards} showsHorizontalScrollIndicator={false}>
                {props.dogs.map(dog=> <TopCards key={dog.id} image={dog.image.url} name={dog.name} />)}
            </ScrollView>
            <Text style={styles.heading}>{animalShow === 'cat' ? 'All cats' : 'All dogs'}</Text>
            {animalShow=== 'dog' && (<FlatList
                data={filteredDogs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
                    return <Card key={item.id} 
                    image={item.image.url}
                    imageId={item.reference_image_id}
                    name={item.name} 
                    description={item.description ? item.description : item.temperament} 
                    id={item.id}
                    type='dog'/>
                }}/>)}
            {animalShow==='cat' && (
                <FlatList
                    data={filteredCats} 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index})=>{
                        return <Card key={item.id}
                        image={item.reference_image_id}
                        imageId={item.reference_image_id}
                        name={item.name}
                        description={item.description}
                        id={item.id}
                        type='cat' />
                    }} />
            )}
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    layout:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    topBar:{
        height: 64,
        width: 64,
    },
    filterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        paddingRight: 16
    },
    subFilter1:{
        borderColor: "gray",
        width: 250,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    subFilter2:{
        flexDirection: 'row'
    },
    subFilter2Button:{
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontWeight: 'bold',
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    heading:{
        fontWeight: 'bold'
    },
    flatlist:{
        alignItems: 'flex-start'
    },
    topCards:{
        flexDirection: 'row',
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        height: 100,
    }
})
