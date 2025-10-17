import { getQuestionById } from "@/services/api";
import { useEffect, useState } from "react";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  quiz: IQuizTable | null;
}

export default function QuizModal({ open, onClose, quiz }: QuizModalProps) {
  const [questions, setQuestions] = useState<IQuestionsTable[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<{
    correct: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    if (!quiz?._id) return;
    const fetchQuestion = async () => {
      const res = await getQuestionById(quiz._id);
      console.log("📌 Quiz API response:", res.data);
      if (res?.data?.questions) {
        setQuestions(res.data.questions);
        setCurrentIndex(0);
        setResult(null);
        setSelectedAnswers({});
      }
    };
    fetchQuestion();
  }, [quiz?._id]);

  if (!open || !quiz) return null;

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    if (result) return; // sau khi nộp bài thì không cho đổi
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const userAnswer = selectedAnswers[q._id];
      const correctAnswer = q.answers.find((a) => a.isCorrect);
      if (userAnswer && userAnswer === correctAnswer?._id) {
        correctCount++;
      }
    });
    setResult({ correct: correctCount, total: questions.length });
    setCurrentIndex(0); // chuyển về câu đầu để review
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg text-gray-900 font-semibold">{quiz.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {result && (
          <div className="mt-4 text-center">
            <div className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-6"
              >
                <defs>
                  <linearGradient
                    id="tech-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="50%" stopColor="#4facfe" />{" "}
                    <stop offset="100%" stopColor="#7367f0" />{" "}
                  </linearGradient>
                </defs>
                <path
                  fill="url(#tech-gradient)"
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                  clipRule="evenodd"
                />
                <path
                  fill="url(#tech-gradient)"
                  d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"
                />
              </svg>
              Kết quả: <span className="text-green-600">{result.correct}</span>{" "}
              / <span>{result.total}</span>
            </div>
          </div>
        )}

        {/* Question */}
        {currentQuestion && (
          <div className="mt-6">
            <div className="my-4">
              {" "}
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {" "}
                Question {currentIndex + 1}{" "}
              </label>{" "}
              <textarea
                value={currentQuestion.questionText}
                disabled
                placeholder="Enter your question..."
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                rows={2}
              />{" "}
            </div>
            <div className="space-y-3">
              {currentQuestion.answers.map((ans) => {
                const isSelected =
                  selectedAnswers[currentQuestion._id] === ans._id;
                const isCorrect = ans.isCorrect;

                // sau khi nộp bài thì highlight
                let highlight = "";
                if (result) {
                  if (isCorrect) {
                    highlight = "border-green-500 bg-green-50";
                  } else if (isSelected && !isCorrect) {
                    highlight = "border-red-500 bg-red-50";
                  } else {
                    highlight = "border-gray-300";
                  }
                } else {
                  highlight = isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400";
                }

                return (
                  <label
                    key={ans._id}
                    className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${highlight}`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      checked={isSelected}
                      disabled={!!result}
                      onChange={() =>
                        handleSelectAnswer(currentQuestion._id, ans._id)
                      }
                    />
                    <span className="text-gray-700">{ans.answerText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            ← Prev
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next →
            </button>
          ) : result ? (
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={onClose}
            >
              Đóng
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              disabled={Object.keys(selectedAnswers).length < questions.length}
            >
              Nộp bài
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
