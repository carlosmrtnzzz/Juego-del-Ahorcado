import React, { useState, useEffect } from "react";
import "./App.css";

const palabrasEjemplo = [

  { palabra: "NETBEANS", descripcion: "Un entorno de desarrollo integrado popular para desarrollo en Java." },
  { palabra: "ECLIPSE", descripcion: "Un entorno de desarrollo integrado popular para desarrollo en Java." },
  { palabra: "JAVASCRIPT", descripcion: "Un lenguaje de programación popular para construir sitios web interactivos y dar comportamiento a las aplicaciones." },
  { palabra: "REACT", descripcion: "Una biblioteca de Javascript utilizada para construir interfaces de usuario interactivas." },
  { palabra: "PROGRAMACION", descripcion: "El proceso de desarrollar código para ayudar a las computadoras a realizar tareas." },
  { palabra: "INFORMATICA", descripcion: "La ciencia que estudia el procesamiento automático de información mediante computadoras." },
  { palabra: "HTML", descripcion: "El lenguaje de marcado de hipertexto utilizado para crear la estructura y el contenido de las páginas web." },
  { palabra: "NODEJS", descripcion: "Un entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome." },
  { palabra: "VSCODE", descripcion: "Un editor de código fuente desarrollado por Microsoft con soporte para múltiples lenguajes." },
  { palabra: "PYTHON", descripcion: "Un lenguaje de programación versátil y fácil de aprender, ampliamente utilizado en ciencia de datos y desarrollo web." },
  { palabra: "JAVA", descripcion: "Un lenguaje de programación popular para aplicaciones empresariales, móviles y de escritorio." },
  { palabra: "MYSQL", descripcion: "Un sistema de gestión de bases de datos relacional de código abierto." },
  { palabra: "MONGODB", descripcion: "Una base de datos NoSQL orientada a documentos, utilizada en aplicaciones escalables." },
  { palabra: "GITHUB", descripcion: "Una plataforma basada en Git para alojamiento de código y colaboración entre desarrolladores." },
  { palabra: "APACHE", descripcion: "Un servidor web de código abierto ampliamente utilizado en la web." },
  { palabra: "DOCKER", descripcion: "Una plataforma para la creación, despliegue y ejecución de aplicaciones en contenedores." },
  { palabra: "LINUX", descripcion: "Un sistema operativo de código abierto basado en Unix, ampliamente utilizado en servidores." },
  { palabra: "UBUNTU", descripcion: "Una distribución de Linux popular por su facilidad de uso y soporte de comunidad." },
  { palabra: "WINDOWS", descripcion: "Un sistema operativo desarrollado por Microsoft, ampliamente utilizado en computadoras personales." },
  { palabra: "MACOS", descripcion: "El sistema operativo desarrollado por Apple para sus computadoras Mac." },
  { palabra: "JSON", descripcion: "Un formato ligero de intercambio de datos basado en texto y fácil de leer para humanos y máquinas." },
  { palabra: "AJAX", descripcion: "Una técnica de desarrollo web para actualizar contenido sin recargar la página." },
  { palabra: "REST", descripcion: "Un estilo de arquitectura para el diseño de servicios web basado en recursos." },
  { palabra: "ANGULAR", descripcion: "Un framework de desarrollo web basado en TypeScript, desarrollado por Google." },
  { palabra: "TYPESCRIPT", descripcion: "Un superconjunto de JavaScript que agrega tipado estático y características avanzadas." },
  { palabra: "BABEL", descripcion: "Un compilador de JavaScript que convierte código moderno en versiones compatibles con navegadores antiguos." },
  { palabra: "BOOTSTRAP", descripcion: "Un framework de CSS para crear sitios web responsivos y modernos." },
  { palabra: "JQUERY", descripcion: "Una biblioteca de JavaScript diseñada para simplificar la manipulación del DOM y eventos." },
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
      window.alert(`¡Juego terminado! Has fallado tres veces. La palabra era: ${datosPalabra.palabra}`);
      funcionReiniciarJuego();
    } else if (intentosFallidos > 0) {
      3 - intentosFallidos
    }
  }, [intentosFallidos, datosPalabra.palabra]);

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