import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './components/Card';
import Pagination from './components/PageButtons';
import Pokelist from './components/PokeList';

export default function App() {

  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [pokeList, setPokeList] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon")

  
  
  useEffect(()=>{
    let isCancelled = false
    setPokeList([])
    async function getAllData(){
      const response = await axios.get(currentPage)

      if(!isCancelled){
        setNextPage(response.data.next)
        setPrevPage(response.data.previous)
    
        function getIndPokeData(result){
          result.forEach(async pokemon => {
            const objRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            setPokeList(prevList => [...prevList, objRes.data])
          })
        }
        getIndPokeData(response.data.results) 
      }
      
      }
    getAllData()

    return ()=>{
      isCancelled = true
    }

  }, [currentPage])

  pokeList.sort((a, b) => a.id - b.id)
  

  function renderPokemon(itemData){
    return <Card name={itemData.item.name} image={itemData.item.sprites.front_default} />
  }

  function pressNext(){
    setCurrentPage(nextPage)
    setPokeList([])
  }

  function pressPrev(){
    setCurrentPage(prevPage)
    setPokeList([])
  }

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

});
