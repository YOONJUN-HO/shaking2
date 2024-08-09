const SHAKE_THRESHOLD = 15; // 감지 임계값, 가속도 변화가 이 값을 넘으면 흔들림으로 간주
let lastY = 0; 
let lastShakeTime = 0;
const SHAKE_TIME_THRESHOLD = 500; // 밀리초 단위, 너무 빈번한 감지를 막기 위한 시간 간격

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

    // 너무 빈번한 감지를 방지하기 위해 시간 간격 설정
    if ((currentTime - lastShakeTime) > SHAKE_TIME_THRESHOLD) {
        const shakeDirection = detectShakeDirection(currentY);

        if (shakeDirection) {
            lastShakeTime = currentTime; // 마지막 감지 시간을 갱신
            document.getElementById('status').innerText = shakeDirection;
            document.getElementById('shake-info').innerText = `Y축 가속도: ${currentY.toFixed(2)}`;
        }
    }
});
