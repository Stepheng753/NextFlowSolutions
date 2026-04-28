import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export interface ArrowProp {
  id: number;
  y: number; // Vertical position (%)
  delay: number; // Animation delay
  scale: number; // Size scale
  speed: number; // Duration of entry
  xEnd: number; // Where it stops horizontally (%)
  variant: 'cyan' | 'blue' | 'purple'; // Color variant
}