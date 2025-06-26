import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Trend = 'up' | 'down' | 'neutral';

interface MetricWidgetProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  trend?: Trend;
  trendText?: string;
  linkTo?: string;
  className?: string;
}

const TrendIcon: React.FC<{ trend?: Trend }> = ({ trend }) => {
  if (trend === 'up') {
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  }
  if (trend === 'down') {
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  }
  return <ArrowRight className="h-4 w-4 text-muted-foreground" />;
};

const MetricWidget: React.FC<MetricWidgetProps> = ({
  icon: Icon,
  title,
  value,
  trend = 'neutral',
  trendText,
  linkTo,
  className
}) => {
  console.log('MetricWidget loaded for:', title);

  const cardContent = (
    <Card className={cn(
      "transition-all duration-300",
      linkTo ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {trendText && (
          <div className={cn(
            "flex items-center space-x-1 text-xs text-muted-foreground mt-1",
            trend === 'up' && "text-green-600",
            trend === 'down' && "text-red-600"
          )}>
            <TrendIcon trend={trend} />
            <span>{trendText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default MetricWidget;