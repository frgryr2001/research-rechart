import React, {
  createContext,
  useContext,
  useMemo,
  type ComponentProps,
} from 'react';
import { cn } from '@/lib/utils';
import { DefaultTooltipContent } from 'recharts';


type Payload = Pick<ComponentProps<typeof DefaultTooltipContent> , 'payload'>['payload'];
type PayloadItem = NonNullable<Payload>[number];


interface TooltipContextValue {
  active: boolean;
  label?: string;
  payload?: Payload
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within ChartTooltip');
  }
  return context;
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: Payload;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartTooltipRoot: React.FC<ChartTooltipProps> = ({
  active = false,
  payload = [],
  label,
  children,
  className,
}) => {

  if (!active || payload.length === 0) return null;

  const contextValue = useMemo(
    () => ({ active, label, payload }),
    [active, label, payload]
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div
        className={cn(
          'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

interface ChartTooltipLabelProps {
  children?: (label?: string) => React.ReactNode;
  className?: string;
  formatter?: (label?: string) => string;
}

const ChartTooltipLabel: React.FC<ChartTooltipLabelProps> = ({
  children,
  className,
  formatter,
}) => {
  const { label } = useTooltipContext();

  // If children render function is provided
  if (children) {
    return <>{children(label)}</>;
  }

  // Default rendering
  const displayLabel = formatter ? formatter(label) : label;

  return (
    <div className={cn('font-semibold text-foreground', className)}>
      {displayLabel}
    </div>
  );
};


type ItemData = Pick<PayloadItem, 'dataKey' | 'name' | 'value' | 'color' | 'payload' | 'unit'>;

const TooltipItemContext = createContext<ItemData | null>(null);

const useTooltipItemContext = () => {
  const context = useContext(TooltipItemContext);
  if (!context) {
    throw new Error(
      'TooltipItem child components must be used within TooltipItem'
    );
  }
  return context;
};




interface ChartTooltipItemsProps {
  renderItem?:
    | React.ReactNode
    | ((item: ItemData, index: number) => React.ReactNode);
  className?: string;
  filter?: (item: ItemData) => boolean;
}

const ChartTooltipItems: React.FC<ChartTooltipItemsProps> = ({
  renderItem,
  className,
  filter,
}) => {
  const { payload } = useTooltipContext();

  const filteredPayload = filter ? payload?.filter(filter) : payload;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {filteredPayload?.map((item, index) => {
        const itemData: ItemData = {
          dataKey: item.dataKey,
          name: item.name || item.dataKey,
          value: item.value,
          color: item.color || item.payload.fill || item.stroke ,
          payload: item.payload,
          unit: item.unit,
        };

        return (
          <TooltipItemContext.Provider key={item.dataKey} value={itemData}>
            {typeof renderItem === 'function'
              ? renderItem(itemData, index)
              : renderItem || (
                  <ChartTooltip.Item>
                    <ChartTooltip.ItemIndicator />
                    <ChartTooltip.ItemName />
                    <ChartTooltip.ItemValue />
                  </ChartTooltip.Item>
                )}
          </TooltipItemContext.Provider>
        );
      })}
    </div>
  );
};

interface ChartTooltipItemProps {
  children: React.ReactNode;
  className?: string;
}

const ChartTooltipItem: React.FC<ChartTooltipItemProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>{children}</div>
  );
};

interface ChartTooltipItemIndicatorProps {
  shape?: 'circle' | 'square' | 'line';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ChartTooltipItemIndicator: React.FC<ChartTooltipItemIndicatorProps> = ({
  shape = 'circle',
  className,
  size = 'md',
}) => {
  const { color } = useTooltipItemContext();

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    line: 'rounded-full h-0.5',
  };

  return (
    <div
      className={cn(
        shapeClasses[shape],
        {
          'size-2.5': size === 'sm',
          'size-3.5': size === 'md',
          'size-4.5': size === 'lg',
        },
        className
      )}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

interface ChartTooltipItemNameProps {
  className?: string;
  formatter?: (name: string) => string;
  name?: string;
}

const ChartTooltipItemName: React.FC<ChartTooltipItemNameProps> = ({
  className,
  formatter,
  name,
}) => {
  const { name: contextName } = useTooltipItemContext();

  const displayName = formatter ? formatter(name ?? contextName as string) : name ?? contextName;

  return (
    <span className={cn('text-muted-foreground', className)}>
      {displayName}
    </span>
  );
};

interface ChartTooltipItemValueProps {
  className?: string;
  formatter?: (value: any) => string;
  prefix?: string;
  suffix?: string;
}

const ChartTooltipItemValue: React.FC<ChartTooltipItemValueProps> = ({
  className,
  formatter,
  prefix = '',
  suffix = '',
}) => {
  const { value, color, unit } = useTooltipItemContext();
  const displayValue = formatter ? formatter(value) : value;
  const finalSuffix = suffix || unit || '';

  return (
    <span className={cn('font-semibold', className)} style={{ color }}>
      {prefix}
      {displayValue}
      {finalSuffix}
    </span>
  );
};

export const ChartTooltip = {
  Root: ChartTooltipRoot,
  Label: ChartTooltipLabel,
  Items: ChartTooltipItems,
  Item: ChartTooltipItem,
  ItemIndicator: ChartTooltipItemIndicator,
  ItemName: ChartTooltipItemName,
  ItemValue: ChartTooltipItemValue,
};
