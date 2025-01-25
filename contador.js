// Variables del contador
let timerInterval;  // Para almacenar el setInterval
let remainingTime = 600;  // 10 minutos en segundos (600 segundos)
let isCountingDown = false;  // Estado del contador
let isPaused = false;  // Flag para saber si está pausado

// Función para iniciar el contador
function startCountdown() {
    if (!isCountingDown && !isPaused) {
        isCountingDown = true;
        timerInterval = setInterval(updateCountdown, 1000);  // Llama a updateCountdown cada segundo
    }
}

// Función para actualizar el contador
function updateCountdown() {
    // Si el tiempo llega a 0, detener el contador
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert("Fi del període");
        isCountingDown = false;
        //Quan el contador arribi a 0 mostrar nomes el boto reiniciar
        temps_acabat_contador();
    } else {
        // Restar 1 segundo del tiempo restante
        remainingTime--;

        // Mostrar el tiempo restante en formato mm:ss
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        document.getElementById('timer').textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

// Función para formatear el tiempo con 2 dígitos
function formatTime(time) {
    return time < 10 ? `0${time}` : time;  // Si el tiempo es menor que 10, agregar el cero
}

// Función para reiniciar el contador
function resetCountdown() {
    remainingTime = 600;  // Reiniciar a 10 minutos (600 segundos)
    clearInterval(timerInterval);  // Detener el contador si está en marcha
    isCountingDown = false;
    isPaused = false;
    document.getElementById('timer').textContent = '10:00';  // Restablecer el tiempo en pantalla
}

// Función para pausar el contador
function pauseCountdown() {
    if (isCountingDown) {
        clearInterval(timerInterval);  // Detener el contador
        isCountingDown = false;
        isPaused = true;
    }
}

// Función para reanudar el contador
function resumeCountdown() {
    if (!isCountingDown && isPaused) {
        isCountingDown = true;
        isPaused = false;
        timerInterval = setInterval(updateCountdown, 1000);  // Reanudar el contador
    }
}

// Amagar/mostrar botons segons sigui necessari

function iniciar_contador(){
    startCountdown();
    document.getElementById("boto_iniciar_contador").hidden = true;
    document.getElementById("boto_reiniciar_contador").hidden = false;
    document.getElementById("boto_pausar_contador").hidden = false;
    document.getElementById("boto_reanudar_contador").hidden = true;
}

function reiniciar_contador(){
    resetCountdown();
    document.getElementById("boto_iniciar_contador").hidden = false;
    document.getElementById("boto_reiniciar_contador").hidden = true;
    document.getElementById("boto_pausar_contador").hidden = true;
    document.getElementById("boto_reanudar_contador").hidden = true;
}

function pausar_contador(){
    pauseCountdown();
    document.getElementById("boto_iniciar_contador").hidden = true;
    document.getElementById("boto_reiniciar_contador").hidden = false;
    document.getElementById("boto_pausar_contador").hidden = true;
    document.getElementById("boto_reanudar_contador").hidden = false;
}

function reanudar_contador(){
    resumeCountdown();
    document.getElementById("boto_iniciar_contador").hidden = true;
    document.getElementById("boto_reiniciar_contador").hidden = false;
    document.getElementById("boto_pausar_contador").hidden = false;
    document.getElementById("boto_reanudar_contador").hidden = true;
}

function temps_acabat_contador(){
    document.getElementById("boto_iniciar_contador").hidden = true;
    document.getElementById("boto_reiniciar_contador").hidden = false;
    document.getElementById("boto_pausar_contador").hidden = true;
    document.getElementById("boto_reanudar_contador").hidden = true;
}