"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-lime-50 border border-lime-200">
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl text-[#1b3c2e]">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-[#4d7c0f]/90">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9f99d" />
              <XAxis dataKey="date" stroke="#4d7c0f" />
              <YAxis domain={[0, 100]} stroke="#4d7c0f" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-lime-100 border border-lime-300 rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium text-[#1b3c2e]">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-[#4d7c0f]/90">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#84cc16"
                strokeWidth={2}
                dot={{ r: 4, fill: "#65a30d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
