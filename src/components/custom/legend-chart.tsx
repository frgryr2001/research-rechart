import React, { createContext, useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';

// Context for Legend
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

// Legend Items
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
          renderItem(item, index)
        ) : (
          <ChartLegend.Item key={index} item={item} />
        )
      )}
    </div>
  );
};

// Individual Legend Item
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

// Updated Legend Item
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
