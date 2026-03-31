import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Privacy() {
  const [incognito, setIncognito] = useState(false);
  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState(false);

  return (
    <View style={styles.container}>
      <Item label="Incognito Mode" value={incognito} onChange={setIncognito}/>
      <Item label="Camera Usage" value={camera} onChange={setCamera}/>
      <Item label="Use of Location" value={location} onChange={setLocation}/>
    </View>
  );
}


const Item = ({ label, value, onChange }: any) => (
  <View style={styles.item}>
    <Text>{label}</Text>
    <Switch value={value} onValueChange={onChange}/>
  </View>
);

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  item:{flexDirection:"row",justifyContent:"space-between",marginBottom:20}
});