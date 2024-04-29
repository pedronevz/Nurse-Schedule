"use client"
import ScheduleGrid from "../components/ScheduleGrid";
import {Nurse} from '../types'
import React, { useState } from 'react';

const SchedulePage: React.FC = () => {
  const [nurses, setNurses] = useState<Nurse[]>([
    { id: 1, name: 'Maria' },
    { id: 2, name: 'João' }
  ]);

  const daysInMonth = new Date(2024, 2, 0).getDate(); // Fevereiro de 2024

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Escala</h1>
      <ScheduleGrid nurses={nurses} daysInMonth={daysInMonth} />
    </div>
  );
};

export default SchedulePage;