"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl text-[#1b3c2e] font-bold gradient-title">
        <Trophy className="h-6 w-6 text-lime-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#1b3c2e]">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="w-full h-3 rounded-lg bg-lime-100"
            style={{ '--progress-bar-color': '#84cc16' }}
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-lime-100 p-4 rounded-lg border border-lime-300">
            <p className="font-medium text-[#1b3c2e]">Improvement Tip:</p>
            <p className="text-[#4d7c0f]/90">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-[#1b3c2e]">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-lime-200 rounded-lg p-4 space-y-2 bg-lime-50"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-[#1b3c2e]">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-lime-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-[#4d7c0f]/90">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-lime-100 p-2 rounded border border-lime-200">
                <p className="font-medium text-[#1b3c2e]">Explanation:</p>
                <p className="text-[#4d7c0f]/90">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full bg-lime-600 text-white hover:bg-lime-700"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
