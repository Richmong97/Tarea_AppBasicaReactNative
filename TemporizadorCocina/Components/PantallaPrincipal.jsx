import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const Temporizador = () => {
  const [tiempoRestante, setTiempoRestante] = useState({ minutos: 0, segundos: 5 });
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  const iniciar = () => {
    if (tiempoRestante.minutos === 0 && tiempoRestante.segundos === 0) {
      // Si el tiempo es cero, no hacer nada
      return;
    }

    const id = setInterval(() => {
      setTiempoRestante((prevTime) => {
        if (prevTime.minutos === 0 && prevTime.segundos === 0) {
          clearInterval(id);
          return { minutos: 0, segundos: 0 };
        }

        if (prevTime.segundos === 0) {
          return { minutos: prevTime.minutos - 1, segundos: 59 };
        }

        return { minutos: prevTime.minutos, segundos: prevTime.segundos - 1 };
      });
    }, 1000);

    setIntervalId(id);
  };

  const pausar = () => {
    clearInterval(intervalId);
  };

  const reiniciar = () => {
    clearInterval(intervalId);
    setTiempoRestante({ minutos: 0, segundos: 5 }); // Ajustado a 5 segundos para pruebas, puedes cambiarlo
  };

  console.log('Temporizador renderizado');

  return (
    <View>
      <View style={styles.temporizadorContainer}>
        <Text style={styles.temporizador}>{`${formatTime(tiempoRestante.minutos)}:${formatTime(
          tiempoRestante.segundos
        )}`}</Text>
      </View>
      <View style={styles.botones}>
        <Button title="Iniciar" onPress={iniciar} />
        <Button title="Pausar" onPress={pausar} />
        <Button title="Reiniciar" onPress={reiniciar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  temporizadorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  temporizador: {
    fontSize: 48,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default Temporizador;