import { useNavigation } from "@react-navigation/native"
import { View, Text, Image, StyleSheet } from "react-native"

export const Card = (props) =>{
    const nav=useNavigation()
    return(
        <View style={styles.container}>
            <Image 
                source={{uri: props.image}}
                style={styles.image}/>
            <View style={styles.descriptionContainer}>
                <Text 
                style={styles.title}
                onPress={()=>nav.navigate('details', {id: props.id, url: props.image, type: props.type, imageId: props.imageId})}>{props.name}</Text>
                <Text 
                numberOfLines={3} 
                style={styles.description}
                onPress={()=>nav.navigate('details', {id: props.id, url: props.image, type: props.type, imageId: props.imageId})}>{props.description }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginVertical: 3,
        height: 100
    },
    image:{
        borderRadius: 10,
        flex: 1
    },
    descriptionContainer:{
        flex: 3,
        borderRadius: 10,
        marginLeft: 10,
        justifyContent: 'space-evenly'
    },
    title:{
        fontSize: 15
    },
    description:{
        fontSize: 10
    }
})