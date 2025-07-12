import React from 'react';
import { StatCard } from './StatCard';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface StatsSectionProps {
  stats: StatItem[];
  className?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};

export default StatsSection;
