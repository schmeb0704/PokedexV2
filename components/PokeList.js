import {View, FlatList} from "react-native"

export default function Pokelist(props){
  const {pokeData, renderItem} = props
  return(
    <View>
      <FlatList 
        data={pokeData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  )
}