// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. BARRA DE PROGRESO DE LECTURA
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 5px; 
        background: #ffd43b; width: 0%; z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    };

    // 2. SISTEMA DE COPIADO DE CÓDIGO
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
        block.style.position = 'relative';
        const button = document.createElement('button');
        button.innerText = 'Copiar';
        button.style.cssText = `
            position: absolute; right: 10px; top: 10px;
            padding: 5px 10px; font-size: 12px; background: #4b8bbe;
            color: white; border: none; border-radius: 3px; cursor: pointer;
        `;

        button.addEventListener('click', () => {
            const code = block.innerText.replace('Copiar', '');
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = '¡Copiado!';
                button.style.background = '#27ae60';
                setTimeout(() => {
                    button.innerText = 'Copiar';
                    button.style.background = '#4b8bbe';
                }, 2000);
            });
        });
        block.appendChild(button);
    });

    // 3. MINI-QUIZ INTERACTIVO (Inyección dinámica)
    const quizSection = document.getElementById('ejercicios');
    const quizContainer = document.createElement('div');
    quizContainer.innerHTML = `
        <hr style="margin: 2rem 0; border: 0; border-top: 1px dashed #ccc;">
        <h3>⚡ Rápido: ¿Cuánto sabes de Python?</h3>
        <p>¿Cuál es la función correcta para imprimir en pantalla?</p>
        <button class="quiz-btn" onclick="checkAnswer(this, false)">console.log()</button>
        <button class="quiz-btn" onclick="checkAnswer(this, true)">print()</button>
        <button class="quiz-btn" onclick="checkAnswer(this, false)">echo</button>
        <p id="quiz-feedback" style="margin-top: 10px; font-weight: bold;"></p>
    `;
    quizSection.appendChild(quizContainer);

    // Estilos rápidos para los botones del quiz
    const style = document.createElement('style');
    style.innerHTML = `
        .quiz-btn { margin: 5px; background: #eee; color: #333; border: 1px solid #ccc; }
        .quiz-btn:hover { background: #ddd; }
        .correct { background: #27ae60 !important; color: white !important; }
        .wrong { background: #e74c3c !important; color: white !important; }
    `;
    document.head.appendChild(style);
});

// Función de validación de respuesta
function checkAnswer(btn, isCorrect) {
    const feedback = document.getElementById('quiz-feedback');
    const allBtns = document.querySelectorAll('.quiz-btn');
    
    allBtns.forEach(b => b.disabled = true); // Desactivar tras responder

    if (isCorrect) {
        btn.classList.add('correct');
        feedback.innerText = "¡Correcto! Python usa la función print().";
        feedback.style.color = "#27ae60";
    } else {
        btn.classList.add('wrong');
        feedback.innerText = "Casi... la respuesta correcta era print().";
        feedback.style.color = "#e74c3c";
    }
}
