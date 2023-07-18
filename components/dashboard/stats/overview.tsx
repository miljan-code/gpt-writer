'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { Overview } from '@/types/stats';

const fakeData = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 50) + 10,
  },
];

interface OverviewProps {
  data: Overview[];
}

export function Overview({ data }: OverviewProps) {
  const isAllEmpty = data.every(item => !item.total);

  if (!data || isAllEmpty)
    return (
      <div className="relative after:absolute after:inset-0 after:w-full after:h-full after:z-10 after:bg-background/20 after:backdrop-blur-md after:ml-1">
        <ResponsiveContainer width="100%" height={350} className="p-0">
          <BarChart data={fakeData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => `${value}`}
            />
            <Bar dataKey="total" fill="#1a8cff33" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
          Nothing to show...
        </div>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={350} className="p-0">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `${value}`}
        />
        <Bar dataKey="total" fill="#1a8cff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
