
import React from 'react';

export interface Experience {
  title: string;
  meta: string;
  org?: string;
  duties?: string[];
  description?: string;
}

export type HistoryItem = {
  id: number;
  command?: string;
  output: React.ReactNode;
};
