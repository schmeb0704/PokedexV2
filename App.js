import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './components/Card';

export default function App() {

  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [pokeList, setPokeList] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon")

  async function getAllData(){

    const response = await fetch(currentPage)
    const data = await response.json()

    setNextPage(data.next)
    setPrevPage(data.previous)

    function getIndPokeData(result){
      result.forEach(async pokemon => {
        const objRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const objData = await objRes.json()
        
        setPokeList(prevList => [...prevList, objData])
      })
    }

    getIndPokeData(data.results)
    
    
  }


  useEffect(()=>{
    
    getAllData()
  }, [currentPage])

  pokeList.sort((a, b) => a.id - b.id)

  function renderPokemon(itemData){
    const {name, sprites} = itemData.item

    return <Card name={name} image={sprites.front_default} />
  }


  return(
    <View>
      <Pressable>
        <Text>Previous</Text>
      </Pressable>

      <Pressable>
        <Text>Next</Text>
      </Pressable>

      <FlatList 
        data={pokeList}
        key={item => item.key}
        renderItem={renderPokemon}
        numColumns={2}
      />
    </View>
  )

}

const styles = StyleSheet.create({

});
