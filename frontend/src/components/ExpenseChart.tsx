import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { Summary } from "../types/transaction.types";

interface Props {
  summary: Summary;
}

type ChartData = {
  name: string;
  value: number;
};

const COLORS: string[] = ["#22c55e", "#ef4444"];

const ExpenseChart = ({ summary }: Props) => {
  const data: ChartData[] = [
    { name: "Income", value: summary.income },
    { name: "Expense", value: summary.expense },
  ];

  const isEmpty = summary.income === 0 && summary.expense === 0;

  if (isEmpty) {
    return (
      <p className="text-center text-gray-400 py-10">No data to display</p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value: unknown) => {
            const num = Number(value);
            return [`$${num.toFixed(2)}`, ""];
          }}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
