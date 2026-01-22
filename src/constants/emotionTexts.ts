// emotion별 텍스트 상수
// emotion 번호는 1부터 시작 (emotionIndex + 1)
export const EMOTION_TEXTS: Record<number, string> = {
  1: '',
  2: '사랑이 가까워질수록 우리는 더 신중해지고, 더 집중하게 된다.<br/>말 한마디, 눈빛 하나에도 온 신경이 곤두서고, 닿는 거리, 흐르는 공기에까지 예민해진다.<br/>이 감정은 간절함의 다른 형태이며, 무너지지 않기 위해 세심하게 균형을 잡는 마음의 움직임이다.',
  3: '마음이 가라앉지 못하고 들떠서 두근거리는 상태.<br/>아직 펼쳐지지 않은 페이지 앞에서 조용히 뛰기 시작한다.<br/>언제나 오래 머물지는 않지만, 그 찰나의 감정은 우리를 다시 살아있게 만든다.',
  4: '맞서지 않고, 외면하는 선택은 가장 약한 마음에서 비롯되기도 한다.<br/>하지만 그것은 단지 회피가 아니라, 고백이기도 하다.<br/>비겁함은 누구나 스치듯 지나치는 감정이지만 그 순간을 인정하는 일은 의외로 용기를 필요로 한다.',
  5: '',
  6: '물리적인 혼자 있음이 아니라 누군가와 이어져 있지 않다고 느끼는 내면의 상태.<br/>이 감정은 공허함이자, 나와 나 사이에 생긴 거리이며,<br/>무언가를 원했지만 닿지 못한 자리에서 피어난다.<br/>그러나 외로움은 단지 결핍이 아닌, 나를 마주하는 통로가 되기도 한다.',
  7: '',
  8: '',
  9: '',
  10: '함께 웃고, 소소한 이야기에 시간 가는 줄 모를 때,<br/>그 가벼운 감정은 우리 삶을 환하게 밝힌다.<br/>즐거움은 특별한 일이 없어도 찾아오고, 그 무엇을 하지 않아도 충분할 때 완성된다.<br/>작은 공감, 우스운 표정, 같은 노래를 흥얼거리는 순간에서 피어난다.',
  11: '기다릴 수 없는 마음, 멈추지 못하는 손끝, 판단이 결정으로 굳어지기 전에 먼저 몸으로 드러난다.<br/>위험할 수 있지만, 동시에 억눌린 감정이 더 이상 참을 수 없을 때의 해방이기도 하다.<br/>무언가를 끝내고자 하거나, 혹은 시작하고자 하는 의지와 연결되기도 한다.',
  12: '슬픔의 가장자리에서 피어나는 감정으로, 누군가의 말일 수도 있고,<br/>그저 곁에 머무름일 수도 있다.<br/>누군가의 슬픔을 완전히 이해할 수는 없어도, 함께 그 자리에 있어 주겠다는 마음에서 시작된다.<br/>어쩌면, 슬픔을 덜어주기보다는 나 자신을 안아주는 방법을 배우는 것.',
  13: '상황을 바꾸려는 시도가 점점 덜어지고 덜어지다 결국 멈춰버리는 지점.<br/>무력감은 방어의 뒤편에 자리하며, 감정과 행동 사이의 끈을 천천히 끊어낸다.<br/>소용없다는 생각이 모든 가능성을 덮어버릴 때, 그곳에 남아 움직이지 않는 덩어리.',
  14: '유대감은 이해하려는 마음보다 그저 곁에 있으려는 마음에서 자라난다.<br/>멀리 있어도, 말하지 않아도, 상대에 대한 서로의 믿음에서 비롯된다.<br/>때로는 함께한 시간보다, 함께 지나온 일들이 더 단단하게 만든다.',
  15: '확신할 수 없고, 무엇이 맞는지도 모호해지는 그 순간, 마음은 계속해서 방향을 바꾸며 흔들린다.<br/>그 안에는 수많은 감정이 겹쳐 있고, 그 복합적인 감정들이 이해되지 않은 채 피어난다.<br/>혼란은 가장 복잡한 감정의 교차점이다.',
};

// emotion별 질문 상수 (Q. 뒤에 올 질문 내용)
// MiddleModalFrame을 사용하는 감정들(2, 3, 4, 6, 10, 11, 12, 13, 14, 15)에 대한 질문
export const EMOTION_QUESTIONS: Record<number, string> = {
  2: '긴장감 속에 의도치 않은 상황을 만들었던<br/>경험이 있나요?',
  3: '당신을 움직이게 만드는,<br/>가장 설레고 기대되는 순간은 언제인가요?',
  4: '약한 마음에 솔직하지 못했던 경험을 나누고,<br/>그 순간을 털어내 보야요.',
  6: '외로움 속에서 발견한 나의 새로운 면에는<br/>어떤 것이 있나요?',
  10: '소중한 친구와 만들었던 추억 중<br/>가장 기억에 남는 순간은 언제 였나요?',
  11: '충동에 휩싸여 무언가 큰 변화가 일어났던<br/>경험이 있나요?',
  12: '예상치 못한 순간,<br/>나도 모르게 위로받았던 경험이 있나요?',
  13: '당신에게 찾아온 무력감을 마주한 뒤,<br/>한층 더 성장했던 경험이 있나요?',
  14: '깊은 유대감 속에 자리잡은 신뢰를<br/>실감했던 순간이 있나요?',
  15: '혼란 속에서 흔들릴 때, 안정을 되찾는<br/>자신만의 방법이 있다면 어떤 것인가요?',
};

// emotion 번호로 텍스트를 가져오는 헬퍼 함수
export const getEmotionText = (emotionNumber: number): string => {
  return EMOTION_TEXTS[emotionNumber] || '';
};

// emotion별 제목과 설명 상수
// MiddleModalFrame을 사용하는 감정들(2, 3, 4, 6, 10, 11, 12, 13, 14, 15)에 대한 제목과 설명
export const EMOTION_TITLES: Record<number, { title: string; description: string }> = {
  2: { title: '긴장감', description: ': 사랑 앞에서 드러나는 마음의 진동' },
  3: { title: '설렘', description: ': 사랑의 전조' },
  4: { title: '비겁', description: ': 진실을 외면하는' },
  6: { title: '외로움', description: ': 비어있는 자리를 통해 내 안을 들여다보게 하는' },
  10: { title: '즐거움', description: ': 특별하지 않아 더 빛나는' },
  11: { title: '충동', description: ': 감정이 이성을 앞질러 움직이는' },
  12: { title: '위로', description: ': 비어있는 자리를 통해 내 안을 들여다보게 하는' },
  13: { title: '무력감', description: ': 아무리 애써도 달라지지 않을 거라는 확신' },
  14: { title: '유대감', description: ': 서로의 단단한 신뢰' },
  15: { title: '혼란', description: ': 방향을 잃은 감정' },
};

// useBigOrSmallFrame을 사용하는 감정들(1, 5, 7, 8, 9)에 대한 제목, 부제목, 설명
export const EMOTION_TITLES_BIG: Record<
  number,
  { title: string; subtitle: string; description: string }
> = {
  1: {
    title: '우정',
    subtitle: ': 나 아닌 누군가를 기꺼이 마음에 들이는',
    description:
      '우정은 비슷한 웃음, 반복되는 말장난, 침묵마저 어색하지 않은 순간들 속에서 천천히 쌓인다.<br/>우리는 친구와 함께일 때 대담하고, 더 솔직해지며, 가장 나다운 모습으로 살아갈 수 있다.<br/>이 감정은 긴 호흡과 작은 선택들이 이어져 만들어진다.<br/>가장 자연스럽고, 가장 공들여 만들어지는 감정.',
  },
  5: {
    title: '분노',
    subtitle: ': 감정의 불씨',
    description:
      '상처, 모욕, 부당함, 억압과 같은 받아들일 수 없는 상황 앞에서 터져나온다.<br/>분노는 때로 말보다 빠르고, 생각보다 앞서며, 우리를 지키기 위한 수단으로써 솟구친다.<br/>때로는 타인을 향하고, 때로는 나 자신에게 향하기도 하며, 불편하고 거친 감정이지만 <br/>그 안에는 정당함, 변화에 대한 열망이 깃들어 결국 전환으로 나아가도록 한다.',
  },
  7: {
    title: '사랑',
    subtitle: ': 우리를 부드럽게, 가장 단단하게 만드는',
    description:
      '열렬히 좋아하고, 함께 하고 싶어 하는 마음에서 비롯 되어 나의 마음을 내보이는 감정이다.<br/>사랑은 설렘과 온기, 연결의 기쁨을 안겨 주지만 동시에 상실과 집착, 불안을 불러 오기도 한다. <br/>그 모든 면을 끌어 안았을 때, 사랑이 비로소 ‘내 것’이 된다. <br/>사랑은 밖을 향하면서도 결국 새로운 나를 발견 하고, 깊이 들여다 보게 한다.',
  },
  8: {
    title: '상실감',
    subtitle: ': 잃어버린 것들과 함께 살아가는 법을 배우는',
    description:
      '사라진 관계와 시간, 닿을 수 없는 순간들은 각기 다른 얼굴로 남는다.<br/>우린 외면하려 하지만 결국 우리를 멈추게 한다.<br/>상실은 끝이 아니라 다른 모습으로 머무는 시작이다.<br/>그 깊음은 오래도록 지워지지 않는다.',
  },
  9: {
    title: '방어',
    subtitle: ': 상처받지 않기 위해 자신을 감추는',
    description:
      '공격을 막기위해 시작되지만, 믿음이 흔들릴 때 또는 이해받지 못할까 두렵기 때문에 계속된다. <br/>그 안에는 ‘나는 틀리지 않았다’는 간절한 바람이 숨어 있다. <br/>이 감정은 옳고 그름의 문제가 아니라 무너지지 않기 위해 취하는 자세다. <br/>자신을 지키기 위한 방패이자, 때로는 진심에 다가가지 않기 위한 거리두기다.',
  },
};

// emotion 번호로 질문을 가져오는 헬퍼 함수
export const getEmotionQuestion = (emotionNumber: number): string => {
  return EMOTION_QUESTIONS[emotionNumber] || '';
};

// emotion 번호로 제목과 설명을 가져오는 헬퍼 함수
export const getEmotionTitle = (
  emotionNumber: number,
): { title: string; description: string } | null => {
  return EMOTION_TITLES[emotionNumber] || null;
};

// useBigOrSmallFrame을 사용하는 감정의 제목, 부제목, 설명을 가져오는 헬퍼 함수
export const getEmotionTitleBig = (
  emotionNumber: number,
): { title: string; subtitle: string; description: string } | null => {
  return EMOTION_TITLES_BIG[emotionNumber] || null;
};

// island 페이지에서 사용할 섬별 설명 상수
export const ISLAND_DESCRIPTIONS: Record<number, string> = {
  1: '', // 우정섬 설명
  5: '', // 분노섬 설명
  7: '', // 사랑섬 설명
  8: '', // 상실섬 설명
  9: '', // 방어섬 설명
};

// 섬별 설명을 가져오는 헬퍼 함수
export const getIslandDescription = (emotionNumber: number): string => {
  return ISLAND_DESCRIPTIONS[emotionNumber] || '';
};

// 연관감정 팀 매핑: [2 3 7], [5 11 15], [6 8 12], [1 10 14], [4 9 13]
export const EMOTION_GROUPS: number[][] = [
  [2, 3, 7],
  [5, 11, 15],
  [6, 8, 12],
  [1, 10, 14],
  [4, 9, 13],
];

// 감정 번호로 연관감정을 가져오는 헬퍼 함수
export const getRelatedEmotions = (emotionNumber: number): number[] => {
  const group = EMOTION_GROUPS.find((g) => g.includes(emotionNumber));
  if (!group) return [];
  // 현재 감정을 제외한 같은 팀의 감정들 반환
  return group.filter((num) => num !== emotionNumber);
};
