export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { val1, val2, val3 } = req.body;

  // 1. 서버에 설정된 정답들과 사용자가 입력한 값을 비교
  const isCorrect = 
    val1 === process.env.KEY1 && 
    val2 === process.env.KEY2 && 
    val3 === process.env.KEY3;

  if (isCorrect) {
    // 2. 모두 맞으면 환경 변수에 숨겨둔 'ANSWER' 값을 반환
    return res.status(200).json({ 
      success: true, 
      finalAnswer: process.env.ANSWER, // ← 핵심: 서버만 아는 비밀값
      message: "축하합니다! 최종 코드를 획득하셨습니다."
    });
  } else {
    // 3. 하나라도 틀리면 비밀값은 절대 보내주지 않음
    return res.status(401).json({ 
      success: false, 
      message: "입력값이 올바르지 않습니다." 
    });
  }
}