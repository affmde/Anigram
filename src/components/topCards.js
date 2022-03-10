import { StyleSheet, View, Image, Text } from "react-native"

export const TopCards = (props) => {
    return(
        <View style={styles.layout}>
            <Image 
                style={styles.image}
                source={{uri: props.image}}/>
            <Text style={styles.text} numberOfLines={1}>{props.name}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    layout:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100,
        maxWidth: 60,
        marginHorizontal:5,
       
    },
    image:{
        height: 50,
        width: 50,
        borderRadius: 25
    },
    text: {
        fontSize: 8,
    }
})