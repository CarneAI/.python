document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Anuncio (Aparece tras 4 segundos)
    const modal = document.getElementById('modal-anuncio');
    const closeBtn = document.querySelector('.close-btn');

    setTimeout(() => {
        modal.style.display = "block";
    }, 4000); // 4000 milisegundos = 4 segundos

    // Cerrar modal al hacer click en la X
    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    // Cerrar modal al hacer click fuera de la caja blanca
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 2. Quiz Rápido inyectado por JS
    const quizBox = document.getElementById('quiz-container');
    quizBox.innerHTML = `
        <h3>⚡ Mini-Reto</h3>
        <p>¿Qué extensión tienen los archivos de Python?</p>
        <button onclick="valida(this, true)">.py</button>
        <button onclick="valida(this, false)">.html</button>
        <p id="feedback"></p>
    `;
});

function valida(btn, isCorrect) {
    const f = document.getElementById('feedback');
    if(isCorrect) {
        f.innerText = "¡Exacto!";
        f.style.color = "green";
        btn.style.background = "#27ae60";
    } else {
        f.innerText = "Inténtalo de nuevo";
        f.style.color = "red";
    }
}
