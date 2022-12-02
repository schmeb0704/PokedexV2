import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native"

export default function Card(props){
  const {name, image} = props
  return(
    <View>
      <Text>{name}</Text>
      <Image 
        source={{uri: image}}
        style={{
          width: 200,
          height: 150,
          resizeMode: "contain"
        }}
      />
    </View>
  )
}