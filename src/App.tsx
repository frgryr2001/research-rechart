'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, Legend, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ChartPieLegend } from './components/pie-chart';

import SimpleChart from './components/ui/SimpleChart';

export const description = 'A multiple line chart';

const titleValue = {
  spark_joy_live_more: 'Spark Joy Live More',
  live_bright_today: 'Live Bright Today',
  moments_that_matter: 'Moments That Matter',
  everyday_better_living: 'Everyday Better Living',
  feel_good_go_further: 'Feel Good, Go Further',
};
const title = {
  spark_joy_live_more: 'spark_joy_live_more',
  live_bright_today: 'live_bright_today',
  moments_that_matter: 'moments_that_matter',
  everyday_better_living: 'everyday_better_living',
  feel_good_go_further: 'feel_good_go_further',
} as const;
const chartData = [
  {
    hours: '7AM',
    [title.spark_joy_live_more]: 186,
    [title.live_bright_today]: 80,
    [title.moments_that_matter]: 120,
    [title.everyday_better_living]: 90,
    [title.feel_good_go_further]: 110,
  },
  {
    hours: '8AM',
    [title.spark_joy_live_more]: 305,
    [title.live_bright_today]: 200,
    [title.moments_that_matter]: 140,
    [title.everyday_better_living]: 110,
    [title.feel_good_go_further]: 130,
  },
  {
    hours: '9AM',
    [title.spark_joy_live_more]: 237,
    [title.live_bright_today]: 120,
    [title.moments_that_matter]: 160,
    [title.everyday_better_living]: 130,
    [title.feel_good_go_further]: 150,
  },
  {
    hours: '10AM',
    [title.spark_joy_live_more]: 73,
    [title.live_bright_today]: 190,
    [title.moments_that_matter]: 180,
    [title.everyday_better_living]: 150,
    [title.feel_good_go_further]: 170,
  },
  {
    hours: '11AM',
    [title.spark_joy_live_more]: 209,
    [title.live_bright_today]: 130,
    [title.moments_that_matter]: 200,
    [title.everyday_better_living]: 170,
    [title.feel_good_go_further]: 190,
  },
  {
    hours: '12PM',
    [title.spark_joy_live_more]: 214,
    [title.live_bright_today]: 140,
    [title.moments_that_matter]: 220,
    [title.everyday_better_living]: 190,
    [title.feel_good_go_further]: 210,
  },
  {
    hours: '1PM',
    [title.spark_joy_live_more]: 270,
    [title.live_bright_today]: 150,
    [title.moments_that_matter]: 240,
    [title.everyday_better_living]: 210,
    [title.feel_good_go_further]: 230,
  },
  {
    hours: '2PM',
    [title.spark_joy_live_more]: 250,
    [title.live_bright_today]: 160,
    [title.moments_that_matter]: 260,
    [title.everyday_better_living]: 230,
    [title.feel_good_go_further]: 250,
  },
  {
    hours: '3PM',
    [title.spark_joy_live_more]: 300,
    [title.live_bright_today]: 170,
    [title.moments_that_matter]: 280,
    [title.everyday_better_living]: 250,
    [title.feel_good_go_further]: 270,
  },
  {
    hours: '4PM',
    [title.spark_joy_live_more]: 280,
    [title.live_bright_today]: 180,
    [title.moments_that_matter]: 300,
    [title.everyday_better_living]: 270,
    [title.feel_good_go_further]: 290,
  },
  {
    hours: '5PM',
    [title.spark_joy_live_more]: 320,
    [title.live_bright_today]: 190,
    [title.moments_that_matter]: 320,
    [title.everyday_better_living]: 290,
    [title.feel_good_go_further]: 310,
  },
  {
    hours: '6PM',
    [title.spark_joy_live_more]: 400,
    [title.live_bright_today]: 200,
    [title.moments_that_matter]: 340,
    [title.everyday_better_living]: 310,
    [title.feel_good_go_further]: 330,
  },
  {
    hours: '7PM',
    [title.spark_joy_live_more]: 380,
    [title.live_bright_today]: 210,
    [title.moments_that_matter]: 360,
    [title.everyday_better_living]: 330,
    [title.feel_good_go_further]: 350,
  },
  {
    hours: '8PM',
    [title.spark_joy_live_more]: 360,
    [title.live_bright_today]: 220,
    [title.moments_that_matter]: 380,
    [title.everyday_better_living]: 350,
    [title.feel_good_go_further]: 370,
  },
  {
    hours: '9PM',
    [title.spark_joy_live_more]: 340,
    [title.live_bright_today]: 230,
    [title.moments_that_matter]: 400,
    [title.everyday_better_living]: 370,
    [title.feel_good_go_further]: 390,
  },
  {
    hours: '10PM',
    [title.spark_joy_live_more]: 320,
    [title.live_bright_today]: 240,
    [title.moments_that_matter]: 380,
    [title.everyday_better_living]: 350,
    [title.feel_good_go_further]: 370,
  },
  {
    hours: '11PM',
    [title.spark_joy_live_more]: 300,
    [title.live_bright_today]: 250,
    [title.moments_that_matter]: 360,
    [title.everyday_better_living]: 330,
    [title.feel_good_go_further]: 350,
  },
  {
    hours: '12AM',
    [title.spark_joy_live_more]: 280,
    [title.live_bright_today]: 260,
    [title.moments_that_matter]: 340,
    [title.everyday_better_living]: 310,
    [title.feel_good_go_further]: 330,
  },
];

const chartConfig = {
  [title.spark_joy_live_more]: {
    label: titleValue[title.spark_joy_live_more],
    color: 'var(--chart-1)',
  },
  [title.live_bright_today]: {
    label: titleValue[title.live_bright_today],
    color: 'var(--chart-2)',
  },
  [title.moments_that_matter]: {
    label: titleValue[title.moments_that_matter],
    color: 'var(--chart-3)',
  },
  [title.everyday_better_living]: {
    label: titleValue[title.everyday_better_living],
    color: 'var(--chart-4)',
  },
  [title.feel_good_go_further]: {
    label: titleValue[title.feel_good_go_further],
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;



const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

export function ChartLineMultiple() {
  return (
    <div className="flex gap-4 mt-4 mx-auto justify-center">
      {/* <LineExample /> */}
      <ChartPieLegend />
      <SimpleChart data={data} />
    </div>
  );
}

function LineExample() {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hours"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={title.everyday_better_living}
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={title.feel_good_go_further}
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={title.live_bright_today}
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={title.moments_that_matter}
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={title.spark_joy_live_more}
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={(props) => {
                return <ChartLegendContent />
            }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


export default ChartLineMultiple;
