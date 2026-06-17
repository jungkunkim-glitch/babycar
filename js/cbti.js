// CBTI 계산 로직

function calculateCBTI(scores) {
    // 각 성향 판정
    const vehicleScore = scores.vehicle || 0;
    const spendingScore = scores.spending || 0;
    const activityScore = scores.activity || 0;
    const familyScore = scores.family || 0;
    const financeScore = scores.finance || 0;

    // 차량 타입 결정
    let vehicleType = 'HYBRID';
    if (vehicleScore > 4) {
        vehicleType = 'EV';
    } else if (vehicleScore < -4) {
        vehicleType = 'ICE';
    }

    // 소비 성향 결정
    let spendingType = 'PRACTICAL';
    if (spendingScore > 3) {
        spendingType = 'LUXURY';
    }

    // 활동 성향 결정
    let activityType = 'STANDARD';
    if (activityScore > 2) {
        activityType = 'SPORTS';
    } else if (familyScore > 2) {
        activityType = 'FAMILY';
    }

    // 금융 성향 결정
    let financeType = 'lease';
    if (financeScore > 2) {
        financeType = 'purchase';
    }

    // 차량 매칭
    let vehicleKey = vehicleType;

    if (vehicleType === 'HYBRID') {
        if (spendingType === 'LUXURY') {
            vehicleKey = 'HYBRID_LUXURY';
        } else if (familyScore > 2) {
            vehicleKey = 'HYBRID_FAMILY';
        } else {
            vehicleKey = 'HYBRID_PRACTICAL';
        }
    } else {
        vehicleKey = `${vehicleType}_${spendingType}`;
        if (activityType !== 'STANDARD') {
            vehicleKey += `_${activityType}`;
        }
    }

    // 기본값 처리
    if (!VEHICLES[vehicleKey]) {
        vehicleKey = vehicleType === 'EV' ? 'EV_STANDARD' :
                     vehicleType === 'ICE' ? 'ICE_STANDARD' : 'HYBRID_PRACTICAL';
    }

    const vehicle = VEHICLES[vehicleKey];

    // 성향 텍스트 생성
    const traits = [];

    // 차량 이용 성향
    if (vehicleScore > 2) {
        traits.push({ icon: '⚡', text: 'EV 선호형' });
    } else if (vehicleScore < -2) {
        traits.push({ icon: '⛽', text: '내연기관 선호형' });
    } else {
        traits.push({ icon: '🔋', text: '하이브리드형' });
    }

    // 소비 성향
    if (spendingScore > 2) {
        traits.push({ icon: '💎', text: '고급 지향' });
    } else if (spendingScore < -2) {
        traits.push({ icon: '💰', text: '실속 지향' });
    } else {
        traits.push({ icon: '⚖️', text: '밸런스형' });
    }

    // 활동 성향
    if (activityScore > 2) {
        traits.push({ icon: '🏃', text: '활동적 라이프' });
    } else if (activityScore < -2) {
        traits.push({ icon: '🏠', text: '루틴 라이프' });
    } else {
        traits.push({ icon: '🎯', text: '균형잡힌 라이프' });
    }

    // 가족 성향
    if (familyScore > 2) {
        traits.push({ icon: '👨‍👩‍👧‍👦', text: '가족 중심형' });
    } else if (familyScore < -2) {
        traits.push({ icon: '👤', text: '개인 중심형' });
    } else {
        traits.push({ icon: '👥', text: '다목적형' });
    }

    // 금융 선호
    if (financeScore > 2) {
        traits.push({ icon: '💳', text: '할부(소유) 선호' });
    } else if (financeScore < -2) {
        traits.push({ icon: '🚗', text: '리스/렌트 선호' });
    } else {
        traits.push({ icon: '💼', text: '유연한 금융 선호' });
    }

    // 할인율 계산 (포인트 기반)
    const discount = 0.5; // 기본 할인율

    // 고유 코드 생성
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `CBTI-${timestamp}-${random}`;

    return {
        vehicle: vehicle.model,
        brand: vehicle.brand,
        traits,
        discount,
        code,
        financeType,
        scores: {
            vehicle: vehicleScore,
            spending: spendingScore,
            activity: activityScore,
            family: familyScore,
            finance: financeScore
        }
    };
}

// 포인트에 따른 할인율 계산
function calculateDiscount(points) {
    if (points >= 600) return 0.7;
    if (points >= 500) return 0.5;
    if (points >= 400) return 0.3;
    if (points >= 300) return 0.2;
    return 0.1;
}

// 금리 계산
function calculateFinanceRate(financeType, discount) {
    const baseRate = financeType === 'purchase' ? 3.9 : 4.9;
    return (baseRate - discount).toFixed(1);
}
