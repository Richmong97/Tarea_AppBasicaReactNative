import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Botones = ({ onIniciar, onPause, onReiniciar }) => {
  console.log('Botones renderizados');

  return (
    <View style={styles.botones}>
      <Button title="Iniciar" onPress={() => { console.log('Iniciar clicked'); onIniciar(); }} />
      <Button title="Pausar" onPress={() => { console.log('Pausar clicked'); onPause(); }} />
      <Button title="Reiniciar" onPress={() => { console.log('Reiniciar clicked'); onReiniciar(); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    borderRadius: 50,
  },
});

export default Botones;
