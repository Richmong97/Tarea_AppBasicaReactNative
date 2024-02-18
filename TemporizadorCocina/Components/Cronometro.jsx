// Cronometro.jsx
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';

const Cronometro = () => {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState({ minutos: 0, segundos: 0 });
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  const iniciarCronometro = () => {
    const id = setInterval(() => {
      setTiempoTranscurrido((prevTime) => ({
        minutos: prevTime.minutos + Math.floor((prevTime.segundos + 1) / 60),
        segundos: (prevTime.segundos + 1) % 60,
      }));
    }, 1000);

    setIntervalId(id);
  };

  const detenerCronometro = () => {
    clearInterval(intervalId);
  };

  const reiniciarCronometro = () => {
    clearInterval(intervalId);
    setTiempoTranscurrido({ minutos: 0, segundos: 0 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.temporizadorContainer}>
        <Text style={styles.temporizador}>{`${formatTime(tiempoTranscurrido.minutos)}:${formatTime(
          tiempoTranscurrido.segundos
        )}`}</Text>
      </View>
      <View style={styles.botones}>
        <View style={styles.botonRedondo}>
          <Button title="Iniciar" onPress={iniciarCronometro} color="#66BB6A" />
        </View>
        <View style={styles.botonRedondo}>
          <Button title="Detener" onPress={detenerCronometro} color="#FFD54F" />
        </View>
        <View style={styles.botonRedondo}>
          <Button title="Reiniciar" onPress={reiniciarCronometro} color="#EF5350" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Fondo oscuro
  },
  temporizadorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temporizador: {
    fontSize: 48,
    color: '#FFFFFF', // Texto blanco
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  botonRedondo: {
    borderRadius: 30,
    overflow: 'hidden', // Asegura que el contenido no se desborda del borderRadius
  },
});

export default Cronometro;