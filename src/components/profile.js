import { ScrollView, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { Button } from "react-native"


export const Profile = (props) => {
    return(
        <SafeAreaView style={styles.layout}>
            <ScrollView>
                <Button title="Logout" onPress={()=>props.setUser(false)} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    layout:{
        paddingTop: StatusBar.currentHeight,

    }
})