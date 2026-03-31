import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Configuration() {
  const [notifications, setNotifications] = useState(false);
  const [dark, setDark] = useState(false);
  const [location, setLocation] = useState(false);

  return (
    <View style={styles.container}>
      <Item label="Notifications" value={notifications} onChange={setNotifications}/>
      <Item label="Dark Mode" value={dark} onChange={setDark}/>
      <Item label="Location" value={location} onChange={setLocation}/>
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