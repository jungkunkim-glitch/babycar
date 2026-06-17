// 게임 데이터

// 알 데이터
const EGGS = [
    {
        id: 'fire',
        emoji: '🔥',
        name: '파이어 에그',
        description: '열정적이고 역동적인 당신에게',
        scores: { activity: 3 }
    },
    {
        id: 'aqua',
        emoji: '🌊',
        name: '아쿠아 에그',
        description: '차분하고 안정적인 당신에게',
        scores: { activity: -3 }
    },
    {
        id: 'thunder',
        emoji: '⚡',
        name: '썬더 에그',
        description: '밸런스 있는 라이프스타일을 원하는 당신에게',
        scores: { activity: 0 }
    }
];

// 질문 데이터
const QUESTIONS = [
    {
        id: 'fuel',
        question: '🍽️ 아기차가 배고파해요! 무엇을 줄까요?',
        options: [
            {
                text: '⚡ 급속 충전 (프리미엄)',
                scores: { vehicle: 3, spending: 2 }
            },
            {
                text: '⚡ 완속 충전 (경제적)',
                scores: { vehicle: 3, spending: -2 }
            },
            {
                text: '⛽ 프리미엄 휘발유',
                scores: { vehicle: -3, spending: 2 }
            },
            {
                text: '⛽ 일반 휘발유',
                scores: { vehicle: -3, spending: -2 }
            }
        ]
    },
    {
        id: 'walk',
        question: '🚗 산책을 가고 싶어해요! 어떻게 갈까요?',
        options: [
            {
                text: '🏍️ 혼자 드라이브',
                scores: { family: -3, activity: 1 }
            },
            {
                text: '👨‍👩‍👧‍👦 가족과 함께 드라이브',
                scores: { family: 3 }
            }
        ]
    },
    {
        id: 'destination',
        question: '🗺️ 어디로 갈까요?',
        options: [
            {
                text: '🏔️ 짜릿한 산길/해안도로',
                scores: { activity: 2, spending: 1 }
            },
            {
                text: '🏡 익숙한 동네 한 바퀴',
                scores: { activity: -2, spending: -1 }
            },
            {
                text: '🎡 놀이공원/테마파크',
                scores: { activity: 2, family: 1, spending: 2 }
            },
            {
                text: '🛒 가까운 마트/공원',
                scores: { activity: -1, family: 1, spending: -2 }
            }
        ]
    },
    {
        id: 'accident',
        question: '😱 앗! 주차장에서 살짝 긁혔어요! 어떻게 할까요?',
        options: [
            {
                text: '💎 바로 완벽하게 수리하기',
                scores: { finance: 3, spending: 2 }
            },
            {
                text: '🔧 저렴한 곳에서 간단히 수리',
                scores: { finance: 2, spending: -2 }
            },
            {
                text: '⏰ 일단 더 타보고 나중에 수리',
                scores: { finance: -3 }
            }
        ]
    },
    {
        id: 'upgrade',
        question: '🎉 아기차가 성장했어요! 업그레이드 할까요?',
        options: [
            {
                text: '✨ 최고급 부품으로 튜닝',
                scores: { spending: 3, activity: 1 }
            },
            {
                text: '🔧 실용적인 옵션 추가',
                scores: { spending: -3 }
            },
            {
                text: '💚 지금 모습 그대로 키우기',
                scores: { spending: 0 }
            }
        ]
    }
];

// 차량 데이터
const VEHICLES = {
    'EV_LUXURY_SPORTS': { brand: '제네시스', model: 'GV60' },
    'EV_LUXURY_FAMILY': { brand: '제네시스', model: '전동화 GV70' },
    'EV_PRACTICAL_SPORTS': { brand: '현대', model: '아이오닉 5' },
    'EV_PRACTICAL_FAMILY': { brand: '기아', model: 'EV6' },
    'EV_STANDARD': { brand: '현대', model: '아이오닉 6' },

    'ICE_LUXURY_SPORTS': { brand: '제네시스', model: 'G70' },
    'ICE_LUXURY_FAMILY': { brand: '제네시스', model: 'GV80' },
    'ICE_PRACTICAL_SPORTS': { brand: '기아', model: 'K5' },
    'ICE_PRACTICAL_FAMILY': { brand: '현대', model: '팰리세이드' },
    'ICE_STANDARD': { brand: '현대', model: '싼타페' },

    'HYBRID_LUXURY': { brand: '제네시스', model: 'G80 하이브리드' },
    'HYBRID_PRACTICAL': { brand: '현대', model: '그랜저 하이브리드' },
    'HYBRID_FAMILY': { brand: '기아', model: '쏘렌토 하이브리드' },
};
