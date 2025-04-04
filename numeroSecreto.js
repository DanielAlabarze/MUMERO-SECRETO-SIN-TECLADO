// Inicializo la librería JSConfetti para efectos de confeti
const jsConfetti = new JSConfetti();



// Obtengo los elementos HTML
const inputEntrada = document.querySelector(".entrada");
const Salida = document.querySelector(".salida");
const GanastePerdiste = document.querySelector(".ganaste");
const IntentosRestantes = document.querySelector(".intentos");
const salidaGanadorPerdedor = document.querySelector(".salidaGanadorPerdedor");
const juegosGanadosElement = document.getElementById("juegosGanados");
const juegosPerdidosElement = document.getElementById("juegosPerdidos");
const botonReinicio = document.getElementById("botonReinicio");
const botonesNumeros = document.querySelectorAll(".numero");


inputEntrada.textContent = 0;
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Obtengo el valor del botón clickeado
    const valorBoton = boton.textContent;
    // Asigno el valor al campo de entrada
    inputEntrada.value = valorBoton;
    // Llamo a la función para adivinar el número secreto
    adivinarNumeroSecreto();
  });
});



// Establezco el mensaje inicial de intentos restantes
IntentosRestantes.innerHTML = "Tenes 10 intentos";

// Inicializo las variables de contador
let intentos = 0;
// Cargo los valores de juegos ganados y perdidos desde localStorage o inicializo en 0
let juegosGanados = parseInt(localStorage.getItem("juegosGanados")) || 0;
let juegosPerdidos = parseInt(localStorage.getItem("juegosPerdidos")) || 0;

// Arrays de frases ganadoras y perdedoras
const frasesGanadoras = [
  "¡Increíble! ¡Sos un verdadero genio de los números!",
  "¡Enhorabuena! ¡Tu mente numérica es impresionante!",
  "¡Campeon! ¡Has demostrado ser el mejor!",
  "¡Guau! ¡Qué habilidad!",
  "¡Impresionante! Que comiste ?",
  "¡Sos un crack!",
  "¡No te lo podes creer ni vos! ¡victoria!",
  "¡Troesma de los números!",
  "¡Tu intuición es imbatible!",
  "¡Sos un ganador indiscutible!",
  "¡Sos el rey de las adivinanzas!",
  "¡Vos sí que la tenes clara!",
  "¡Que groso sos!",
];

const frasesPerdedoras = [
  "¡No te desanimes!",
  "¡La próxima vez seguro que ganas o perdes tambien!",
  "¡Lo importante es participar y divertirse! ¡Mentiraaaa!",
  "¡No te rindas! ¡Ni aun vencido!",
  "¡No te desanimes por esta derrota!",
  "¡Has hecho un gran esfuerzo pero no alzanzo! ¡Ponéte las Pilas!",
  "¡No te preocupes! ¡Todos tenemos días malos!",
  "¡Has jugado con intuición! ¡Pero no te sirvio de nada!",
  "¡Has demostrado que no enbocas una!",
  "¡Lo importante es Ganar! ¡ Y vos perdiste !",
  "¡Ni se te ocurra ir al casino!",
  "¡Mejor guardate unos dias!",
];

// Función para actualizar los contadores en la interfaz y guardar en localStorage
function actualizarContadores() {
  juegosGanadosElement.textContent = juegosGanados;
  juegosPerdidosElement.textContent = juegosPerdidos;
  // Guarda los valores actualizados en localStorage
  localStorage.setItem("juegosGanados", juegosGanados);
  localStorage.setItem("juegosPerdidos", juegosPerdidos);
}

// Función principal del juego para adivinar el número secreto
function adivinarNumeroSecreto() {
  // Obtengo el valor ingresado por el usuario
  const Entrada = inputEntrada.value;

  // Valido la entrada del usuario
  if (Entrada === "" || Entrada < 1 || Entrada > 10) {
    Salida.innerHTML =
      "Por favor, elegí un número entre 1 y 10";
    return;
  }

  // Incremento el contador de intentos
  intentos++;

  // Genero un número secreto aleatorio
  let numeroSecreto = Math.floor(Math.random() * 10) + 1;
  let numeroIngresado = Entrada;

  // Selecciono frases aleatorias para ganar o perder
  const fraseAleatoriaGanador =
    frasesGanadoras[Math.floor(Math.random() * frasesGanadoras.length)];
  const fraseAleatoriaPerdedor =
    frasesPerdedoras[Math.floor(Math.random() * frasesPerdedoras.length)];

  // Verifico si el usuario adivinó el número
  if (numeroIngresado == numeroSecreto) {
    // Efecto de confeti si el usuario gana
    jsConfetti.addConfetti();

    // Muestro mensajes de victoria
    // GanastePerdiste.innerHTML = "¡Ganaste 🎉!";
    // salidaGanadorPerdedor.innerHTML = fraseAleatoriaGanador;

    Swal.fire({
      icon: "success",
      title: `¡Ganaste 🎉! 
       ${fraseAleatoriaGanador}`,
      showConfirmButton: false,
      timer: 3000,
      // width: "700px",
      backdrop: false,
      customClass: {
        title: "mi-titulo", // Clase para el título
        popup: "mi-popup", // Clase para el contenedor principal
        icon: "mi-icono", // Clase para el icono
        htmlContainer: "mi-html-container", // Clase para el contenido HTML
      },
    });

    // Muestro información sobre los intentos restantes
    IntentosRestantes.innerHTML =
      10 - intentos === 1
        ? `Te sobro ${10 - intentos} intento.`
        : `Te sobraron ${10 - intentos} intentos.`;

    Salida.innerHTML = `Elegiste ${Entrada}, Adivinaste el número secreto en ${intentos} ${
      intentos === 1 ? "intento" : "intentos"
    }`;

    // Efecto de confeti adicional después de un breve retraso
    setTimeout(() => {
      jsConfetti.addConfetti();
    }, 300);

    // Reinicio el contador de intentos y limpia el campo de entrada
    intentos = 0;
    inputEntrada.value = "";
    // Incremento el contador de juegos ganados y actualiza la interfaz
    juegosGanados++;
    actualizarContadores();
  } else {
    // Si el usuario no adivina el número
    if (intentos < 10) {
      // Muestro mensaje de intento fallido
      Salida.innerHTML = `Elegiste ${Entrada} y el número secreto era ${numeroSecreto}. Intenta nuevamente`;
      GanastePerdiste.innerHTML = "";
      salidaGanadorPerdedor.innerHTML = "";

      // Muestro los intentos restantes
      IntentosRestantes.innerHTML =
        10 - intentos === 1
          ? `Te queda ${10 - intentos} intento`
          : `Te quedan ${10 - intentos} intentos`;
    } else {
      // Si el usuario agota los intentos
      Salida.innerHTML = `Lo siento, elegiste ${Entrada} y el número secreto era ${numeroSecreto}`;
      IntentosRestantes.innerHTML = `¡Agotaste los 10 intentos!`;
      // GanastePerdiste.innerHTML = "¡Perdiste 😪!";

      // salidaGanadorPerdedor.innerHTML = fraseAleatoriaPerdedor;

      Swal.fire({
        icon: "error",
        title: `¡Perdiste 😪!
  ${fraseAleatoriaPerdedor}`,
        showConfirmButton: false,
        timer: 3000,
        // width: "700px",
        backdrop: false,
        customClass: {
          title: "mi-titulo", // Clase para el título
          popup: "mi-popup", // Clase para el contenedor principal
          icon: "mi-icono", // Clase para el icono
          htmlContainer: "mi-html-container", // Clase para el contenido HTML
        },
      });

      // Reinicio el contador de intentos, limpia el campo de entrada,
      // incremento el contador de juegos perdidos y actualiza la interfaz
      intentos = 0;
      inputEntrada.value = "";
      juegosPerdidos++;
      actualizarContadores();
    }
  }
}

// Función para reiniciar los contadores
function reiniciarContadores() {
  juegosGanados = 0;
  juegosPerdidos = 0;
  inputEntrada.value = 0;
  IntentosRestantes.innerHTML = "Tenes 10 intentos";
  Salida.innerHTML =
    "Por favor, elegí un número entre 1 y 10, luego presiona Enter";
  // salidaGanadorPerdedor.innerHTML = "";
  // GanastePerdiste.innerHTML = "";

  actualizarContadores();
}

// Event listener para la tecla "Enter" en el campo de entrada
inputEntrada.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    adivinarNumeroSecreto();
    inputEntrada.value = "";
  }
});

// Event listener para el botón de reinicio
botonReinicio.addEventListener("click", reiniciarContadores);

// Inicialización: actualiza los contadores y ejecuta el primer juego
actualizarContadores();
adivinarNumeroSecreto();

{
  /* <script defer src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script> */
}
// import Swal from "sweetalert2";

// Swal.fire({
//   icon: "success",
//   title: "Cotización realizada con éxito.",
//   showConfirmButton: false,
//   timer: 2000,
//   width: "500px",
// });

// Swal.fire({
//   icon: "error",
//   title: "Debes completar todos los datos en pantalla.",
//   showConfirmButton: false,
//   timer: 2000,
//   width: "500px",
// });
