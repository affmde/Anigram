import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { LoginComponent } from './src/components/loginComponent';
import { HomepageComponent } from './src/components/homepageComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './src/components/profile';
import { Facts } from './src/components/facts';
import { useState, useEffect } from 'react/cjs/react.development';
import { Details } from './src/components/details';
import { render } from 'react-dom';


const Stack = createStackNavigator()
const EntryView = ({user, setUser, dogs, cats}) => {
  return(
    <Stack.Navigator style={styles.container} screenOptions={{ headerShown: false}}  >
      {!user ? <Stack.Screen name='login' children={()=><LoginComponent setUser={setUser}/>} /> 
      : <Stack.Screen name='logged' children={()=><LoggedView setUser={setUser} dogs={dogs} cats={cats} />} />}
    </Stack.Navigator>
  )
}

const HomepageStack = ({dogs, cats})=>{
  return(
    <Stack.Navigator >
      <Stack.Screen name="homepage" options={{header: () => null}} children={()=><HomepageComponent dogs={dogs} cats={cats} />} />
      <Stack.Screen name="details" component={Details} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const LoggedView = ({setUser, dogs, cats}) =>{
  
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" children={()=><HomepageStack dogs={dogs} cats={cats} />} />
      <Tab.Screen name="facts" component={Facts} />
      <Tab.Screen name= "profile" children={()=><Profile setUser={setUser}/>} />
    </Tab.Navigator>
  )
}


export default function App() {

  const [user, setUser] = useState(false)
  const [dogs, setDogs] = useState(null)
  const [cats, setCats] = useState(null)

  useEffect(()=>{
    const fetchDogs = async () => {
      const response = await fetch('https://api.thedogapi.com/v1/breeds?limit=1000');
      const json = await response.json();
      setDogs(json)
    }

    const fetchCats = async() => {
      const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=1000');
      const json = await response.json();
      setCats(json)
    }

    fetchDogs()
    fetchCats()
  }, [])

  if(!dogs || !cats){
    return <ActivityIndicator size="small" color="#0000ff" />
}
  return (
    <NavigationContainer style={styles.container}>
      <EntryView user={user} setUser={setUser} dogs={dogs} cats={cats} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
