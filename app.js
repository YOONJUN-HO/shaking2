const SHAKE_THRESHOLD = 15; // 흔들림 감지 임계값
let lastY = 0;
let shaking = false; // 현재 흔들림 상태를 추적
const SHAKE_TIME_THRESHOLD = 500; // 흔들림 감지 후 색상 복구 시간

function detectShakeDirection(currentY) {
    const deltaY = currentY - lastY;
    lastY = currentY;

    if (Math.abs(deltaY) > SHAKE_THRESHOLD) {
        shaking = true;
        document.body.style.backgroundColor = 'red'; // 흔들림이 감지되면 배경을 빨간색으로 변경
        return;
    }
}

function resetBackgroundColor() {
    shaking = false;
    document.body.style.backgroundColor = 'white'; // 평소에는 흰색으로 유지
}

window.addEventListener('devicemotion', function(event) {
    const currentY = event.accelerationIncludingGravity.y;

    detectShakeDirection(currentY);

    // 흔들림 감지 후 일정 시간 지나면 배경색 복구
    if (shaking) {
        clearTimeout(resetTimeout);
        var resetTimeout = setTimeout(resetBackgroundColor, SHAKE_TIME_THRESHOLD);
    }
});
