import React from 'react';
import * as RechartsPrimitive from 'recharts';
import { ChartLegend } from '../custom/legend-chart';
import { ChartTooltip } from '../custom/tooltip-chart';


type CustomTooltipProps = React.ComponentProps<
  typeof RechartsPrimitive.Tooltip
> & {
  renderLabel?: (label: string) => React.ReactNode;
  renderItem?: (item: {
    id: string | number;
    name: string;
    value: number | string;
    color: string;
  }) => React.ReactNode;
};

type CustomLegendProps = Pick<RechartsPrimitive.LegendProps, 'payload'> & {
  item: (props: { value: string; color: string }) => React.ReactNode;
};




// Fixed class name and type issues in `SimpleChart`.
const SimpleLineChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <RechartsPrimitive.ResponsiveContainer width="100%" height={400}>
      <RechartsPrimitive.LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis dataKey="name" />
        <RechartsPrimitive.YAxis />
        <RechartsPrimitive.Tooltip
          content={(props) => {
            return (
            <ChartTooltip.Root {...props}>
              <ChartTooltip.Label className="text-yellow-400 border-b border-yellow-400/30 pb-1 mb-2" />
              <ChartTooltip.Items
                className="gap-2"
                renderItem={(item) => (
                  <ChartTooltip.Item className="justify-between">
                    <div className="flex items-center gap-2">
                      <ChartTooltip.ItemIndicator
                        shape={item.dataKey === 'uv' ? 'line' : 'square'}
                      />
                      <ChartTooltip.ItemName
                        className="text-gray-300"
                        formatter={(name) => name.toUpperCase()}
                      />
                    </div>
                    <ChartTooltip.ItemValue className="font-bold" prefix="$" />
                  </ChartTooltip.Item>
                )}
              />
            </ChartTooltip.Root>
          )
          }}
        />
        <RechartsPrimitive.Legend
          content={(props) => (
            <ChartLegend.Root payload={props.payload} className='flex justify-center'>
              <ChartLegend.Items
                // filter={(item) => item.value !== 'uv'}
                renderItem={(item) => (
                  <ChartLegend.Item key={item.id} item={item} className="text-sm">
                    <ChartLegend.ItemIndicator shape='square'/>
                    <ChartLegend.ItemValue />
                  </ChartLegend.Item>
                )}
              />
            </ChartLegend.Root>
          )}
        />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="pv"
          stroke="var(--chart-1)"
        />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="uv"
          stroke="var(--chart-2)"
        />
      </RechartsPrimitive.LineChart>
    </RechartsPrimitive.ResponsiveContainer>
  );
};

export default SimpleLineChart;
