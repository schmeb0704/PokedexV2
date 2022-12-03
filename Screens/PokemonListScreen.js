import {View} from "react-native"

import Pagination from './components/PageButtons';
import Pokelist from './components/PokeList';

export default function PokemonListScreen(){

  return(
    <View style={styles.container}>
      <Pagination goPrev={pressPrev} goNext={pressNext}/>
      <Pokelist pokeData={pokeList} renderItem={renderPokemon} />
  </View>
  )

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 60
  }, 
})