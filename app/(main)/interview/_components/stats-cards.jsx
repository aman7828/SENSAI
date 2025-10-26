import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-lime-50/90 border border-lime-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1b3c2e]">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-lime-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1b3c2e]">{getAverageScore()}%</div>
          <p className="text-xs text-[#4d7c0f]/80">Across all assessments</p>
        </CardContent>
      </Card>

      <Card className="bg-lime-50/90 border border-lime-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1b3c2e]">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-lime-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1b3c2e]">{getTotalQuestions()}</div>
          <p className="text-xs text-[#4d7c0f]/80">Total questions</p>
        </CardContent>
      </Card>

      <Card className="bg-lime-50/90 border border-lime-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1b3c2e]">
            Latest Score
          </CardTitle>
          <Target className="h-4 w-4 text-lime-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1b3c2e]">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-[#4d7c0f]/80">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
