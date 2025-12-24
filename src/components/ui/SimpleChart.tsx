import React from 'react';
import * as RechartsPrimitive from 'recharts';

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
    <div className="bg-white p-10 shadow-md rounded text-xs">
      {props.renderLabel ? props.renderLabel(label) : label}
      {payload.map((item) => {

        return props.renderItem ? (
          props.renderItem({
            id: item.id as string | number,
            name: item.name as string,
            value: item.value  as number | string,
            color: item.color ?? item.payload.fill as string,
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

export const CustomLegend: React.FC<CustomLegendProps> = ({ payload, item }) => {
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
          content={
            <CustomTooltip
              renderLabel={(label) => {
                return <div style={{ fontWeight: 'bold' }}>{label}</div>;
              }}
              renderItem={(item) => {
                return (
                  <div className="flex gap-2 items-center" key={item.id}>
                    <div
                      style={{
                        backgroundColor: item.color,
                      }}
                      className="size-2.5 rounded-full"
                    ></div>
                    <div style={{ color: item.color }}>
                     ABC: {item.value}
                    </div>
                  </div>
                );
              }}
            />
          }
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
