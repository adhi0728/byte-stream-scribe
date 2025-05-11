
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const data = [
  {
    name: "Jan",
    total: 2400,
    views: 1200,
  },
  {
    name: "Feb",
    total: 1398,
    views: 980,
  },
  {
    name: "Mar",
    total: 9800,
    views: 4800,
  },
  {
    name: "Apr",
    total: 3908,
    views: 2600,
  },
  {
    name: "May",
    total: 4800,
    views: 3200,
  },
  {
    name: "Jun",
    total: 3800,
    views: 2900,
  },
  {
    name: "Jul",
    total: 4300,
    views: 3100,
  },
];

const AnalyticsChart = () => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>
          Views and engagement for your blog in the last 7 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#4f46e5"
              strokeWidth={2}
              name="Engagement"
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#16a34a"
              strokeWidth={2}
              name="Views"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
