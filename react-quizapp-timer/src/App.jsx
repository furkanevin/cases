import { useState, useEffect, useRef } from 'react';
import AnswerTable from './components/AnswerTable';
import axios from 'axios';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);

  const formRef = useRef();

  // soruları al
  useEffect(() => {
    axios.get('/db.json').then((res) => setQuestions(res.data));
  }, []);

  // Sayaç
  useEffect(() => {
    // son durum
    if (currentQuestion === questions.length) return;

    // her saniye geriye say sıfırlanınca 30 dan başlat
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          handleNextQuestion();
          return 5;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, questions.length]);

  // seçilen seçeneği kaydeder
  const handleOptionSelect = (option) => {
    // daha önce mevcut soruya ait eklenen cevabu bul
    const found = answers.find((i) => currentQuestion === i.question);

    if (found) {
      // daha önce verilen bir cevap varsa onu güncelle
      setAnswers(
        answers.map((i) =>
          i.question === currentQuestion ? { ...i, answer: option } : i
        )
      );
    } else {
      // yoksa yeni cevap ekle
      setAnswers([...answers, { question: currentQuestion, answer: option }]);
    }
  };

  // sonraki soruya geçer
  const handleNextQuestion = () => {
    // Sonraki soruya geç
    setCurrentQuestion(currentQuestion + 1);
    // daha önce seçilen seçeneği temizle
    formRef.current.reset();
  };

  return (
    <div className="h-screen bg-zinc-900 text-white py-5 px-4">
      <div className="container max-w-lg mx-auto">
        <h1 className="text-4xl text-center my-20">QUIZ</h1>
        {questions.length > 0 && currentQuestion < questions.length ? (
          <div className="relative flex flex-col items-center border rounded py-6 px-5">
            <div className="absolute bg-black top-[-25px] p-3 border rounded-full">
              {timeLeft}
            </div>

            <h2 className="text-lg text-blue-400 text-center my-5">
              Soru {currentQuestion + 1} / {questions.length}
            </h2>

            <p className="text-center text-[20px] font-semibold">
              {questions[currentQuestion].text}
            </p>

            <form ref={formRef} className="mt-10 w-full flex flex-col gap-5">
              {questions[currentQuestion].choices.map((option, index) => (
                <label
                  htmlFor={index}
                  className={`
                    ${timeLeft > 20 ? 'bg-zinc-700 cursor-not-allowed' : ''}
                    border rounded p-3 cursor-pointer hover:bg-gray-700 flex justify-between`}
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}

                  <input
                    disabled={timeLeft > 20}
                    id={index}
                    name="question"
                    type="radio"
                  />
                </label>
              ))}
            </form>
          </div>
        ) : (
          <AnswerTable questions={questions} answers={answers} />
        )}
      </div>
    </div>
  );
};

export default App;
