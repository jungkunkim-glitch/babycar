// 메인 앱 로직

// 게임 상태
const gameState = {
    currentScreen: 'intro',
    selectedEgg: null,
    currentQuestion: 0,
    scores: {
        vehicle: 0,
        spending: 0,
        activity: 0,
        family: 0,
        finance: 0
    },
    points: 100,
    result: null
};

// 앱 초기화
function init() {
    renderScreen('intro');
}

// 화면 렌더링
function renderScreen(screenName) {
    const app = document.getElementById('app');
    const pointsCounter = document.getElementById('points-counter');

    gameState.currentScreen = screenName;

    // 포인트 카운터 표시 여부
    if (screenName === 'intro' || screenName === 'egg-select') {
        pointsCounter.style.display = 'none';
    } else {
        pointsCounter.style.display = 'block';
        updatePointsDisplay();
    }

    switch (screenName) {
        case 'intro':
            app.innerHTML = renderIntroScreen();
            break;
        case 'egg-select':
            app.innerHTML = renderEggSelectScreen();
            attachEggSelectListeners();
            break;
        case 'growth':
            app.innerHTML = renderGrowthScreen();
            attachGrowthListeners();
            break;
        case 'result':
            app.innerHTML = renderResultScreen();
            attachResultListeners();
            break;
    }
}

// 인트로 화면
function renderIntroScreen() {
    return `
        <div class="intro-screen">
            <div class="emoji">🚗</div>
            <h1>마이 드림카 키우기</h1>
            <p>당신만의 드림카를 키워보세요!</p>
            <button class="btn btn-primary" onclick="startGame()">
                시작하기
            </button>
        </div>
    `;
}

function startGame() {
    renderScreen('egg-select');
}

// 알 선택 화면
function renderEggSelectScreen() {
    const eggsHTML = EGGS.map(egg => `
        <div class="egg-card ${egg.id}" data-egg-id="${egg.id}">
            <div class="egg-emoji">${egg.emoji}</div>
            <h3>${egg.name}</h3>
            <p>${egg.description}</p>
        </div>
    `).join('');

    return `
        <div class="egg-select-screen">
            <h2>알을 선택해주세요!</h2>
            <div class="eggs-container">
                ${eggsHTML}
            </div>
            <button class="btn btn-primary" id="start-growth-btn" style="display: none;">
                이 알로 시작하기
            </button>
        </div>
    `;
}

function attachEggSelectListeners() {
    const eggCards = document.querySelectorAll('.egg-card');
    const startBtn = document.getElementById('start-growth-btn');

    eggCards.forEach(card => {
        card.addEventListener('click', () => {
            // 다른 카드 선택 해제
            eggCards.forEach(c => c.classList.remove('selected'));

            // 현재 카드 선택
            card.classList.add('selected');

            // 선택된 알 저장
            const eggId = card.dataset.eggId;
            gameState.selectedEgg = EGGS.find(e => e.id === eggId);

            // 알 선택 점수 적용
            Object.keys(gameState.selectedEgg.scores).forEach(key => {
                gameState.scores[key] += gameState.selectedEgg.scores[key];
            });

            // 포인트 추가
            gameState.points += 50;

            // 시작 버튼 표시
            startBtn.style.display = 'inline-block';
        });
    });

    startBtn.addEventListener('click', () => {
        renderScreen('growth');
    });
}

// 성장 미션 화면
function renderGrowthScreen() {
    const question = QUESTIONS[gameState.currentQuestion];
    const progress = ((gameState.currentQuestion + 1) / QUESTIONS.length) * 100;

    const optionsHTML = question.options.map((option, index) => `
        <button class="option-btn" data-option-index="${index}">
            ${option.text}
        </button>
    `).join('');

    return `
        <div class="growth-screen">
            <div class="progress-bar">
                <div class="progress-info">
                    <span>진행도: ${gameState.currentQuestion + 1} / ${QUESTIONS.length}</span>
                    <span>포인트: ${gameState.points}P</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="car-character">🚗</div>

            <div class="question-card">
                <h2>${question.question}</h2>
                <div class="options-container">
                    ${optionsHTML}
                </div>
            </div>
        </div>
    `;
}

function attachGrowthListeners() {
    const optionBtns = document.querySelectorAll('.option-btn');

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const optionIndex = parseInt(btn.dataset.optionIndex);
            handleAnswer(optionIndex);
        });
    });
}

function handleAnswer(optionIndex) {
    const question = QUESTIONS[gameState.currentQuestion];
    const selectedOption = question.options[optionIndex];

    // 점수 누적
    Object.keys(selectedOption.scores).forEach(key => {
        gameState.scores[key] = (gameState.scores[key] || 0) + selectedOption.scores[key];
    });

    // 포인트 추가
    gameState.points += 50;
    updatePointsDisplay();

    // 다음 질문 또는 결과
    if (gameState.currentQuestion < QUESTIONS.length - 1) {
        gameState.currentQuestion++;
        renderScreen('growth');
    } else {
        // CBTI 계산
        gameState.result = calculateCBTI(gameState.scores);
        gameState.result.points = gameState.points;
        gameState.result.finalDiscount = calculateDiscount(gameState.points);
        gameState.result.finalRate = calculateFinanceRate(
            gameState.result.financeType,
            gameState.result.finalDiscount
        );

        renderScreen('result');
    }
}

// 포인트 표시 업데이트
function updatePointsDisplay() {
    document.getElementById('points-value').textContent = gameState.points;
}

// 결과 화면
function renderResultScreen() {
    const result = gameState.result;

    const traitsHTML = result.traits.map(trait => `
        <div class="trait-item">
            <span class="trait-icon">${trait.icon}</span>
            <span>${trait.text}</span>
        </div>
    `).join('');

    const financeName = result.financeType === 'purchase' ? '할부' : '리스';
    const monthlyPayment = result.financeType === 'purchase' ? 650000 : 550000;
    const term = result.financeType === 'purchase' ? 60 : 36;

    return `
        <div class="result-screen">
            <div class="result-card">
                <h1>🎉 당신의 CBTI 결과!</h1>

                <div class="car-display">🚗</div>

                <div class="vehicle-info">
                    <h2>${result.vehicle}</h2>
                    <p>${result.brand}</p>
                </div>

                <div class="traits-section">
                    <h3>📊 당신의 드라이빙 프로필</h3>
                    ${traitsHTML}
                </div>

                <div class="rewards-section">
                    <h3>🎯 획득 혜택</h3>
                    <div class="points-display">${result.points}P</div>
                    <div class="discount-info">
                        금리 ${result.finalDiscount}% 할인 적용!
                    </div>
                </div>

                <div class="code-section">
                    <div class="code-label">당신만의 혜택 코드</div>
                    <div class="code-value">${result.code}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #999;">
                        유효기간: 30일
                    </div>
                </div>

                <div style="background: #f5f5f5; border-radius: 15px; padding: 20px; margin-bottom: 20px; text-align: left;">
                    <h3 style="font-size: 18px; margin-bottom: 15px;">💳 맞춤 ${financeName} 상품</h3>
                    <div style="margin-bottom: 8px;">
                        <strong>게임 혜택 금리:</strong> 연 ${result.finalRate}%
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>기본 금리:</strong> 연 ${result.financeType === 'purchase' ? '3.9' : '4.9'}%
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>포인트 할인:</strong> -${result.finalDiscount}%
                    </div>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
                    <div style="font-size: 20px; font-weight: bold; color: #667eea;">
                        월 ${financeName === '할부' ? '할부금' : '리스료'}: 약 ${monthlyPayment.toLocaleString()}원
                    </div>
                    <div style="font-size: 14px; color: #666; margin-top: 5px;">
                        (${term}개월 기준)
                    </div>
                </div>

                <div class="cta-buttons">
                    <button class="btn btn-success" onclick="goToConsult()">
                        💰 지금 바로 상담받기
                    </button>
                    <button class="btn btn-secondary" onclick="shareResult()">
                        📤 결과 공유하기
                    </button>
                    <button class="btn btn-warning" onclick="restart()">
                        🔄 다시 키우기
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachResultListeners() {
    // 버튼 이벤트는 인라인으로 처리됨
}

// 상담 페이지로 이동
function goToConsult() {
    const result = gameState.result;
    const url = `https://www.hyundai-capital.com/cbti-offer?code=${result.code}&vehicle=${encodeURIComponent(result.vehicle)}&type=${result.financeType}&points=${result.points}&discount=${result.finalDiscount}`;

    alert(`상담 페이지로 이동합니다!\n\n코드: ${result.code}\n\n실제 서비스에서는 이 링크로 이동됩니다:\n${url}`);

    // 실제로는 아래 코드 사용
    // window.location.href = url;
}

// 결과 공유
function shareResult() {
    const result = gameState.result;
    const text = `🚗 나의 CBTI 결과!\n\n${result.brand} ${result.vehicle}\n\n획득 포인트: ${result.points}P\n금리 할인: ${result.finalDiscount}%\n\n당신의 드림카는? 지금 테스트하기!`;

    // Web Share API 지원 확인
    if (navigator.share) {
        navigator.share({
            title: '마이 드림카 키우기 - CBTI 결과',
            text: text
        }).catch(err => console.log('공유 취소:', err));
    } else {
        // 텍스트 복사
        navigator.clipboard.writeText(text).then(() => {
            alert('결과가 클립보드에 복사되었습니다!');
        }).catch(err => {
            alert('공유 기능을 사용할 수 없습니다.');
        });
    }
}

// 게임 재시작
function restart() {
    // 상태 초기화
    gameState.currentScreen = 'intro';
    gameState.selectedEgg = null;
    gameState.currentQuestion = 0;
    gameState.scores = {
        vehicle: 0,
        spending: 0,
        activity: 0,
        family: 0,
        finance: 0
    };
    gameState.points = 100;
    gameState.result = null;

    // 인트로 화면으로
    renderScreen('intro');
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', init);
