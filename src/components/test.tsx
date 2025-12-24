import * as RechartsPrimitive from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

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

export function TestComponent() {
  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <RechartsPrimitive.ResponsiveContainer width="100%" height={400}>
          <RechartsPrimitive.LineChart
            style={{
              width: '100%',
              maxWidth: '700px',
              maxHeight: '70vh',
              aspectRatio: 1.618,
            }}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <RechartsPrimitive.XAxis dataKey="name" />
            <RechartsPrimitive.YAxis />
            <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
            <RechartsPrimitive.Tooltip/>
            <RechartsPrimitive.Legend verticalAlign="top" height={36} />
            <RechartsPrimitive.Line
              name="pv of pages"
              type="monotone"
              dataKey="pv"
              stroke="#85d884"
              isAnimationActive={true}
            />
            <RechartsPrimitive.Line
              name="uv of pages"
              type="monotone"
              dataKey="uv"
              stroke="#e61010"
              isAnimationActive={true}
            />
            {/* <RechartsDevtools /> */}
          </RechartsPrimitive.LineChart>
        </RechartsPrimitive.ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
