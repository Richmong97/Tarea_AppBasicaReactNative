// Temporizador.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Alert } from 'react-native';

const Temporizador = ({ onTemporizadorCompleto }) => {
  const [tiempoRestante, setTiempoRestante] = useState({ minutos: 0, segundos: 0 });
  const [inputMinutos, setInputMinutos] = useState('');
  const [inputSegundos, setInputSegundos] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  const iniciar = () => {
    if (!pausado) {
      const minutos = parseInt(inputMinutos, 10) || 0;
      const segundos = parseInt(inputSegundos, 10) || 0;

      if (minutos === 0 && segundos === 0) {
        return;
      }

      const tiempoInicial = { minutos, segundos };

      setTiempoRestante(tiempoInicial);
      setInputMinutos('');
      setInputSegundos('');

      const id = setInterval(() => {
        setTiempoRestante((prevTime) => {
          if (prevTime.minutos === 0 && prevTime.segundos === 0) {
            clearInterval(id);
            Alert.alert('Tiempo finalizado', '¡El tiempo ha terminado!');

            if (onTemporizadorCompleto) {
              const tiempoCompletado = new Date();
              onTemporizadorCompleto({
                tipo: 'Temporizador',
                tiempoTotal: tiempoInicial,
                fechaHoraCompletado: tiempoCompletado.toISOString(),
              });
            }

            return { minutos: 0, segundos: 0 };
          }

          if (prevTime.segundos === 0) {
            return { minutos: prevTime.minutos - 1, segundos: 59 };
          }

          return { minutos: prevTime.minutos, segundos: prevTime.segundos - 1 };
        });
      }, 1000);

      setIntervalId(id);
      setPausado(false);
    } else { // Si está pausado, reanudar el conteo
      const id = setInterval(() => {
        setTiempoRestante((prevTime) => {
          if (prevTime.minutos === 0 && prevTime.segundos === 0) {
            clearInterval(id);
            Alert.alert('Tiempo finalizado', '¡El tiempo ha terminado!');
            return { minutos: 0, segundos: 0 };
          }

          if (prevTime.segundos === 0) {
            return { minutos: prevTime.minutos - 1, segundos: 59 };
          }

          return { minutos: prevTime.minutos, segundos: prevTime.segundos - 1 };
        });
      }, 1000);

      setIntervalId(id);
      setPausado(false);
    }
  };

  const pausar = () => {
    clearInterval(intervalId);
    setPausado(true);
  };

  const reiniciar = () => {
    clearInterval(intervalId);
    setTiempoRestante({ minutos: 0, segundos: 0 });
    setInputMinutos('');
    setInputSegundos('');
    setPausado(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.temporizadorContainer}>
        <Text style={styles.temporizador}>{`${formatTime(tiempoRestante.minutos)}:${formatTime(
          tiempoRestante.segundos
        )}`}</Text>
      </View>
      <View style={styles.entradaTiempoContainer}>
        <TextInput
          style={styles.entradaTiempo}
          placeholder="Minutos"
          placeholderTextColor="#BDBDBD"
          keyboardType="numeric"
          value={inputMinutos}
          onChangeText={(text) => setInputMinutos(text)}
        />
        <TextInput
          style={styles.entradaTiempo}
          placeholder="Segundos"
          placeholderTextColor="#BDBDBD"
          keyboardType="numeric"
          value={inputSegundos}
          onChangeText={(text) => setInputSegundos(text)}
        />
      </View>
      <View style={styles.botones}>
        <View style={styles.botonRedondo}>
          <Button title="Iniciar" onPress={iniciar} color="#66BB6A" />
        </View>
        <View style={styles.botonRedondo}>
          <Button title="Pausar" onPress={pausar} color="#FFD54F" />
        </View>
        <View style={styles.botonRedondo}>
          <Button title="Reiniciar" onPress={reiniciar} color="#EF5350" />
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
  entradaTiempoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  entradaTiempo: {
    height: 40,
    width: '40%',
    borderColor: '#FFD54F', // Borde blanco
    borderWidth: 1,
    textAlign: 'center',
    color: '#FFFFFF', // Texto blanco
    borderRadius: 20, // Bordes redondeados
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

export default Temporizador;