type LegendPayloadItem = {
  inactive: boolean;
  dataKey: string;
  type: string;
  color: string;
  value: string;
  payload: {
    type: string;
    dataKey: string;
    stroke: string;
    activeDot: boolean | { r: number };
    animateNewValues: boolean;
    animationBegin: number;
    animationDuration: number;
    animationEasing: string;
    connectNulls: boolean;
    dot: boolean;
    fill: string;
    hide: boolean;
    isAnimationActive: string;
    label: boolean;
    legendType: string;
    strokeWidth: number;
    xAxisId: number;
    yAxisId: number;
    zIndex: number;
  };
};

type LegendContentProps = {
  align: string;
  iconSize: number;
  itemSorter: string;
  layout: string;
  verticalAlign: string;
  width: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  chartWidth: number;
  chartHeight: number;
  payload: LegendPayloadItem[];
};

export type { LegendContentProps, LegendPayloadItem };