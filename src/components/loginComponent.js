import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Image } from "react-native"
import { useState } from "react/cjs/react.development"
import { useNavigation } from '@react-navigation/native';

export const LoginComponent = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const nav= useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <Image 
                    style={styles.logo}
                    source={{uri: 'https://i.postimg.cc/J47K8Tt2/Anigram-removebg-preview.png'}}/>
            <View style={styles.loginContainer}>
                <Text
                    style={styles.title}>Login</Text>
                <TextInput 
                    placeholder="Username"
                    value={username}
                    onChangeText={(text)=>setUsername(text)}
                    style={styles.text}>
                </TextInput>
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    style={styles.text}>
                </TextInput>
                <Button 
                title="login" onPress={()=>(username && password) && props.setUser(true)}/>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer:{
        justifyContent: 'center',
        textAlign: 'center'
    },
    text:{
        backgroundColor: 'white',
        fontSize: 20,
        marginVertical: 10,
        borderRadius: 10,
        textAlign: 'center',
        paddingHorizontal: 60
    },
    title:{
        fontSize: 60
    },
    logo:{
        height:250,
        width:250
    }
})