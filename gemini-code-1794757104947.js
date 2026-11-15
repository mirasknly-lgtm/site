document.addEventListener('DOMContentLoaded', () => {
    const authCard = document.getElementById('authCard');
    const stepLogin = document.getElementById('stepLogin');
    const step2FA = document.getElementById('step2FA');
    const stepReveal = document.getElementById('stepReveal');

    const loginForm = document.getElementById('loginForm');
    const twoFactorForm = document.getElementById('twoFactorForm');
    const loginBtn = document.getElementById('loginBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timerDisplay = document.getElementById('timer');

    // Таймер для имитации психологического давления
    let secondsLeft = 299;
    setInterval(() => {
        if (secondsLeft > 0) {
            secondsLeft--;
            const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
            const secs = String(secondsLeft % 60).padStart(2, '0');
            timerDisplay.textContent = `${mins}:${secs}`;
        }
    }, 1000);

    // Переключение экранов
    function switchStep(fromStep, toStep) {
        fromStep.classList.remove('active');
        toStep.classList.add('active');
    }

    // Обработка 1-го шага (данные НЕ сохраняются и НЕ отправляются)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginBtn.classList.add('loading');

        setTimeout(() => {
            loginBtn.classList.remove('loading');
            // Очищаем поля сразу после нажатия
            loginForm.reset();
            switchStep(stepLogin, step2FA);
        }, 900);
    });

    // Обработка 2-го шага (2FA)
    twoFactorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        verifyBtn.classList.add('loading');

        setTimeout(() => {
            verifyBtn.classList.remove('loading');
            twoFactorForm.reset();
            authCard.classList.add('expanded');
            switchStep(step2FA, stepReveal);
        }, 900);
    });

    // Сброс симуляции
    resetBtn.addEventListener('click', () => {
        authCard.classList.remove('expanded');
        switchStep(stepReveal, stepLogin);
    });
});