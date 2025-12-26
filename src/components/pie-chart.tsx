'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend as ChartLegendPrimitive,
  ChartTooltip as ChartTooltipPrimitive,
  type ChartConfig,
} from '@/components/ui/chart';
import { ChartTooltip } from './custom/tooltip-chart';
import { ChartLegend } from './custom/legend-chart';

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--chart-3)' },
  { browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'other', visitors: 190, fill: 'var(--chart-5)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export function ChartPieLegend() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltipPrimitive
              cursor={false}
              content={(props) => {

                return (
                  <ChartTooltip.Root {...props}>
                    {/* <ChartTooltip.Label className="text-yellow-400 border-b border-yellow-400/30 pb-1 mb-2" /> */}
                    <ChartTooltip.Items
                      className="gap-2"
                      renderItem={(item) => (
                        <ChartTooltip.Item
                          key={item.dataKey}
                          className="justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <ChartTooltip.ItemIndicator
                              shape={item.dataKey === 'uv' ? 'line' : 'square'}
                            />
                            <ChartTooltip.ItemName
                              className="text-gray-300"
                              formatter={(name) => name.toUpperCase()}
                            />
                          </div>
                          <ChartTooltip.ItemValue
                            className="font-bold"
                            prefix="$"
                          />
                        </ChartTooltip.Item>
                      )}
                    />
                  </ChartTooltip.Root>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegendPrimitive
              content={(props) => (
                <ChartLegend.Root
                  payload={props.payload}
                  className="flex justify-center"
                >
                  <ChartLegend.Items
                    // filter={(item) => item.value !== 'uv'}
                    renderItem={(item) => (
                      <ChartLegend.Item item={item} className="text-sm">
                        <ChartLegend.ItemIndicator shape="square" />
                        <ChartLegend.ItemValue />
                      </ChartLegend.Item>
                    )}
                  />
                </ChartLegend.Root>
              )}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
