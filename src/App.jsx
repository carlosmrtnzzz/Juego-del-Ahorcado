import React, { useState, useEffect } from "react";
import "./App.css";

const palabrasEjemplo = [
  {
    palabra: "HOLA",
    descripcion: "Un saludo común para decir hola."
  },
  {
    palabra: "MUNDO",
    descripcion: "El planeta en el que vivimos, lleno de tierra y agua."
  },
  {
    palabra: "JAVASCRIPT",
    descripcion: "Un lenguaje de programación popular para construir sitios web interactivos y dar comportamiento a las aplicaciones."
  },
  {
    palabra: "REACT",
    descripcion: "Una biblioteca de Javascript en la que hemos escrito este código del proyecto"
  },
  {
    palabra: "PROGRAMACION",
    descripcion: "El proceso de desarrollar código para ayudar a las computadoras a realizar tareas."
  },
  {
    palabra: "INFORMATICA",
    descripcion: "La ciencia que estudia el procesamiento automático de información mediante computadoras."
  }, 
  {
    palabra: "HTML",
    descripcion: "El lenguaje de marcado de hipertexto utilizado para crear la estructura y el contenido de las páginas web."
  }
];

const obtenerPalabraAleatoria = () => {
  const posicionAleatoria = Math.floor(Math.random() * palabrasEjemplo.length);
  return palabrasEjemplo[posicionAleatoria];
};

function App() {
  const [datosPalabra, setDatosPalabra] = useState(obtenerPalabraAleatoria());
  const [mensaje, setMensaje] = useState("");
  const [letrasElegidas, setLetrasElegidas] = useState([]);
  const [pistas, setPistas] = useState(3);
  const [mostrarPalabra, setMostrarPalabra] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(0);

  useEffect(() => {
    if (intentosFallidos >= 3) {
      window.alert("¡Juego terminado! Has hecho demasiados intentos incorrectos.");
      funcionReiniciarJuego();
    }
  }, [intentosFallidos]);

  useEffect(() => {
    if (letrasElegidas.length > 0 && funcionComprobarPalabraAdivinada()) {
      setMensaje("¡Felicidades! ¡Has adivinado la palabra correctamente!");
      setJuegoTerminado(true);
    }
  }, [letrasElegidas]);

  const funcionSeleccionarLetra = (letra) => {
    if (!letrasElegidas.includes(letra)) {
      setLetrasElegidas([...letrasElegidas, letra]);
      if (!datosPalabra.palabra.includes(letra)) {
        setIntentosFallidos(intentosFallidos + 1);
      }
    }
  };

  const funcionPista = () => {
    if (pistas > 0) {
      const indiceLetraOculta = datosPalabra.palabra
        .split("")
        .findIndex((letra) => !letrasElegidas.includes(letra));
      setLetrasElegidas([...letrasElegidas, datosPalabra.palabra[indiceLetraOculta]]);
      setPistas(pistas - 1);
    }
  };

  const funcionMostrarLetras = () => {
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    return Array.from(letras).map((letra, indice) => (
      <button
        key={indice}
        onClick={() => funcionSeleccionarLetra(letra)}
        disabled={letrasElegidas.includes(letra) || juegoTerminado}
        className={`boton-letra ${letrasElegidas.includes(letra) ? "seleccionada" : ""}`}
      >
        {letra}
      </button>
    ));
  };

  const funcionComprobarPalabraAdivinada = () => {
    return datosPalabra.palabra.split("").every((letra) => letrasElegidas.includes(letra));
  };

  const funcionReiniciarJuego = () => {
    setDatosPalabra(obtenerPalabraAleatoria());
    setMensaje("");
    setLetrasElegidas([]);
    setPistas(3);
    setMostrarPalabra(false);
    setJuegoTerminado(false);
    setIntentosFallidos(0);
  };

  return (
    <div className="contenedor">
      <h1>Juego de Adivinar Palabras</h1>
      <div className="contenedor-palabra">
        {Array.from(datosPalabra.palabra).map((letra, indice) => (
          <div
            key={indice}
            className={`letra ${letrasElegidas.includes(letra) ? "visible" : ""}`}
          >
            {letrasElegidas.includes(letra) ? letra : ""}
          </div>
        ))}
      </div>
      <p className="descripcion-palabra">Pista: {datosPalabra.descripcion}</p>
      {mensaje && (
        <div className="mensaje">
          <p>{mensaje}</p>
          {mostrarPalabra && <p>La palabra correcta era: {datosPalabra.palabra}</p>}
        </div>
      )}
      <div className="seccion-botones">
        <div className="seleccion-letras">
          {funcionMostrarLetras()}
        </div>
        <div className="pistas">
          Pistas Restantes: {pistas}{" "}
          <button
            onClick={funcionPista}
            disabled={pistas === 0 || juegoTerminado}
            className="boton-pista"
          >
            Obtener Pista
          </button>
          <div className="seccion-adivinar">
            <button
              onClick={funcionReiniciarJuego}
              className="boton-reiniciar"
            >
              Cambiar palabra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;