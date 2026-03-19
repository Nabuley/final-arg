export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { val1, val2, val3 } = req.body;

  // [디버깅 로그] Vercel Dashboard -> Logs 탭에서 확인 가능
  console.log("Client sent:", { val1, val2, val3 });
  console.log("Server has:", { 
    k1: process.env.KEY1, 
    k2: process.env.KEY2, 
    k3: process.env.KEY3 
  });

  const isCorrect = 
    val1 === process.env.KEY1 && 
    val2 === process.env.KEY2 && 
    val3 === process.env.KEY3;

  if (isCorrect) {
    return res.status(200).json({ success: true, finalAnswer: process.env.ANSWER });
  } else {
    // 401 에러와 함께 서버가 알고 있는 값과 비교해보세요
    return res.status(401).json({ success: false, message: "불일치" });
  }
}
