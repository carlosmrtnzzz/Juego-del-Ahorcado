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
    const letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";

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
    <div className="pagina-contenedor">
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
      <footer>
        <p>Desarrollado por Carlos Martínez Jiménez &copy; </p>
        <a
          href="https://github.com/carlosmrtnzzz/Juego-del-Ahorcado"
          target="_blank"
          rel="noopener noreferrer"
          className="Btn"
        >
          <svg className="svgIcon" viewBox="0 0 496 512" height="1.4em" xmlns="http://www.w3.org/2000/svg">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
          </svg>
          <span className="text">Github</span>
        </a>
      </footer>
    </div>
  );
}

export default App;