import React, { createContext, Fragment, useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';


interface LegendContextValue {
  payload: any[];
}

const LegendContext = createContext<LegendContextValue | null>(null);

const useLegendContext = () => {
  const context = useContext(LegendContext);
  if (!context) {
    throw new Error('Legend components must be used within ChartLegend');
  }
  return context;
};

// Root Component
interface ChartLegendProps {
  payload?: any[];
  children: React.ReactNode;
  className?: string;
}

const ChartLegendRoot: React.FC<ChartLegendProps> = ({
  payload = [],
  children,
  className,
}) => {
  const contextValue = useMemo(() => ({ payload }), [payload]);

  return (
    <LegendContext.Provider value={contextValue}>
      <div className={cn('flex flex-wrap gap-4', className)}>{children}</div>
    </LegendContext.Provider>
  );
};

interface ChartLegendItemsProps {
  renderItem?: (item: any, index: number) => React.ReactNode;
  className?: string;
  filter?: (item: any) => boolean;
}

const ChartLegendItems: React.FC<ChartLegendItemsProps> = ({
  renderItem,
  className,
  filter,
}) => {
  const { payload } = useLegendContext();

  const filteredPayload = filter ? payload.filter(filter) : payload;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {filteredPayload.map((item, index) =>
        renderItem ? (
          <Fragment key={item.value}>{renderItem(item, index)}</Fragment>
        ) : (
          <ChartLegend.Item key={item.value} item={item} />
        )
      )}
    </div>
  );
};


interface LegendItemContextValue {
  color: string;
  value: string;
}

const LegendItemContext = createContext<LegendItemContextValue | null>(null);

const useLegendItemContext = () => {
  const context = useContext(LegendItemContext);
  if (!context) {
    throw new Error('LegendItem components must be used within ChartLegendItem');
  }
  return context;
};


interface ChartLegendItemProps {
  item: { color: string; value: string };
  className?: string;
  children?: React.ReactNode;
}

const ChartLegendItem: React.FC<ChartLegendItemProps> = ({
  item,
  className,
  children,
}) => {
  const contextValue = useMemo(
    () => ({ color: item.color, value: item.value }),
    [item]
  );

  return (
    <LegendItemContext.Provider value={contextValue}>
      <div className={cn('flex items-center gap-2', className)}>{children}</div>
    </LegendItemContext.Provider>
  );
};

type ChartLegendItemIndicatorProps = {
    className?: string;
    shape?: 'circle' | 'square' | 'line';
};
const ChartLegendItemIndicator: React.FC<ChartLegendItemIndicatorProps> = ({
  className,
  shape = 'circle',
}) => {
  const { color } = useLegendItemContext();


 const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    line: 'rounded-full h-0.5',
  };

  return (
    <div
      className={cn('size-4', shapeClasses[shape], className)}
      style={{ backgroundColor: color }}
    ></div>
  );
};

type ChartLegendItemValueProps = {
    className?: string;
    value?: string;
};
const ChartLegendItemValue: React.FC<ChartLegendItemValueProps> = ({ className, value }) => {
  const { value : contextValue } = useLegendItemContext();
  const finalValue = value ?? contextValue;

  return <span className={cn(className)}>{finalValue}</span>;
};

export const ChartLegend = {
  Root: ChartLegendRoot,
  Items: ChartLegendItems,
  Item: ChartLegendItem,
  ItemIndicator: ChartLegendItemIndicator,
  ItemValue: ChartLegendItemValue,
};
