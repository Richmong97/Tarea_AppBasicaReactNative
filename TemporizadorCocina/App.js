import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Temporizador from './Components/Temporizador';

const App = () => {
  const [intervalo, setIntervalo] = useState(null);

  console.log('App renderizado');

  return (
    <View style={styles.container}>
      <Temporizador
        intervalo={intervalo}
        setIntervalo={setIntervalo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
});

export default App;
