const SHAKE_THRESHOLD = 12; // 감지 임계값
let lastY = 0; // 이전 Y축 값
let lastShakeTime = 0;

function detectShakeDirection(currentY) {
    const deltaY = currentY - lastY;
    lastY = currentY;

    if (Math.abs(deltaY) > SHAKE_THRESHOLD) {
        if (deltaY > 0) {
            return '아래로 흔들었어!';
        } else {
            return '위로 흔들었어!';
        }
    }
    return null;
}

window.addEventListener('devicemotion', function(event) {
    const currentY = event.accelerationIncludingGravity.y;
    const currentTime = new Date().getTime();

    if ((currentTime - lastShakeTime) > 500) { // 0.5초에 한 번만 감지
        const shakeDirection = detectShakeDirection(currentY);

        if (shakeDirection) {
            lastShakeTime = currentTime;
            document.getElementById('status').innerText = shakeDirection;
            document.getElementById('shake-info').innerText = `Y축 가속도: ${currentY.toFixed(2)}`;
        }
    }
});
