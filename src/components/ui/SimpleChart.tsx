import React from 'react';
import * as RechartsPrimitive from 'recharts';
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

export const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
      {props.renderLabel ? props.renderLabel(label) : label}
      {payload.map((item) => {
        return props.renderItem ? (
          props.renderItem({
            id: item.id as string | number,
            name: item.name as string,
            value: item.value as number | string,
            color: item.color ?? (item.payload.fill as string),
          })
        ) : (
          <div key={item.id} className="flex justify-between">
            <span style={{ color: item.color }}>{item.name}:</span>
            <span>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export const CustomLegend: React.FC<CustomLegendProps> = ({
  payload,
  item,
}) => {
  if (!payload || payload.length === 0) return null;
  return (
    <div className="flex justify-center gap-x-4 flex-wrap ">
      {payload.map((entry) => {
        return (
          <div key={entry.id} className="flex items-center gap-2">
            {item({
              value: entry.value,
              color: entry.color as string,
            })}
          </div>
        );
      })}
    </div>
  );
};

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
          content={(props) => (
            <ChartTooltip.Root {...props}>
              <ChartTooltip.Label className="text-yellow-400 border-b border-yellow-400/30 pb-1 mb-2" />
              <ChartTooltip.Items
                className="gap-2"
                // renderItem={(item) => (
                //   <ChartTooltip.Item className="justify-between">
                //     <div className="flex items-center gap-2">
                //       <ChartTooltip.ItemIndicator shape={item.dataKey === "uv" ? "line" : "square"}  />
                //       <ChartTooltip.ItemName className="text-gray-300" formatter={(name) => name.toUpperCase()} name='123' />
                //     </div>
                //     <ChartTooltip.ItemValue className="font-bold" prefix="$" />
                //   </ChartTooltip.Item>
                // )}
                renderItem={
                  <ChartTooltip.Item className="justify-between">
                    <div className="flex items-center gap-2">
                      <ChartTooltip.ItemIndicator
                        shape={"square"}
                      />
                      <ChartTooltip.ItemName
                        className="text-gray-300"
                        formatter={(name) => name.toUpperCase()}
                        name="123"
                      />
                    </div>
                    <ChartTooltip.ItemValue className="font-bold" prefix="$" suffix='#' />
                  </ChartTooltip.Item>
                }
              />
            </ChartTooltip.Root>
          )}
        />
        <RechartsPrimitive.Legend
          content={
            <CustomLegend
              item={({ value, color }) => (
                <>
                  <span style={{ color }}>{value}</span>
                  <div
                    style={{
                      backgroundColor: color,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                    }}
                  ></div>
                </>
              )}
            />
          }
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
