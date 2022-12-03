import {View, Pressable, Text, StyleSheet} from "react-native"

export default function Pagination(props){
  const {goPrev, goNext} = props
  return(
    <View style={styles.btnContainer}>
    <Pressable
      onPress={goPrev}
    >
      <Text>Previous</Text>
    </Pressable>

    <Pressable
      onPress={goNext}
    >
      <Text>Next</Text>
    </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
  btnContainer:{
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10
  }
})