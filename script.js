document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración ---
    const startDate = new Date("2025-05-18T00:00:00"); // ¡CAMBIA ESTA FECHA por la tuya! (Año-Mes-Día)
    const numberOfHearts = 300; // Cantidad de hojas/corazones
    const heartColors = ['#ff748c', '#ff8da1', '#ffa0b4', '#ffb3c6', '#ffc6d9', '#e074ff', '#ffea74', '#ff7474']; // Paleta de colores del video

    // --- Elementos del DOM ---
    const leavesContainer = document.getElementById('leavesContainer');
    const textSection = document.getElementById('textSection');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    // --- Función 1: El Contador de Tiempo ---
    function updateTimer() {
        const now = new Date();
        const difference = now - startDate;

        if (difference < 0) {
            // Si la fecha es futura, no mostrar nada raro
            return;
        }

        // Cálculos matemáticos para obtener días, horas, minutos, segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Actualizar el HTML (agregando un '0' si es menor a 10)
        daysSpan.textContent = days;
        hoursSpan.textContent = hours < 10 ? '0' + hours : hours;
        minutesSpan.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsSpan.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    // --- Función 2: Generar el Árbol de Corazones ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Posición aleatoria dentro del contenedor de hojas
        // Usamos un poco de matemáticas para que se concentren más al centro
        const containerWidth = leavesContainer.offsetWidth;
        const containerHeight = leavesContainer.offsetHeight;
        
        // Centro aproximado
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        // Generar dispersión aleatoria
        const spreadX = (Math.random() - 0.5) * containerWidth * 0.9;
        const spreadY = (Math.random() - 0.5) * containerHeight * 0.8;

        heart.style.left = `${centerX + spreadX}px`;
        heart.style.top = `${centerY + spreadY + 50}px`; // +50 para bajar un poco el follaje hacia el tronco

        // Color aleatorio de la paleta
        const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.backgroundColor = randomColor;

        // Tamaño aleatorio para variedad
        const randomScale = 0.8 + Math.random() * 0.6; // Entre 0.8 y 1.4
        // Rotación aleatoria para que no se vean todos iguales
        const randomRotation = -30 + Math.random() * 60; // Entre -30 y +30 grados extra
        heart.style.transform = `rotate(${45 + randomRotation}deg) scale(0)`; // Base 45deg + rotación extra

        // Retraso de animación aleatorio para que aparezcan uno por uno
        const randomDelay = Math.random() * 3; // Entre 0 y 3 segundos
        heart.style.animationDelay = `${randomDelay}s`;

        leavesContainer.appendChild(heart);
    }

    // --- Ejecución de la Secuencia ---

    // 1. Iniciar el contador inmediatamente
    updateTimer();
    setInterval(updateTimer, 1000); // Actualizar cada segundo

    // 2. Crear los corazones
    for (let i = 0; i < numberOfHearts; i++) {
        createHeart();
    }

    // 3. Mostrar el texto después de que el árbol haya crecido (aprox. 3.5 segundos)
    setTimeout(() => {
        textSection.classList.add('visible');
    }, 3500);
});