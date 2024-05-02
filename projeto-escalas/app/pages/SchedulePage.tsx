"use client"
import ScheduleGrid from "../components/ScheduleGrid";
import {Nurse} from '../types'
import React, { useState } from 'react';

const SchedulePage: React.FC = () => {
  const [nurses, setNurses] = useState<Nurse[]>([
    { id: 1, name: 'Maria' },
    { id: 2, name: 'João' }
  ]);

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Escala</h1>
      <div>
        <label htmlFor="year" className="pl-4">Ano: </label>
        <input className="w-24" type="number" id="year" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} />
        <label htmlFor="month">Mês: </label>
        <select className="w-24" id="month" value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))}>
          <option value="0">Janeiro</option>
          <option value="1">Fevereiro</option>
          <option value="2">Março</option>
          <option value="3">Abril</option>
          <option value="4">Maio</option>
          <option value="5">Junho</option>
          <option value="6">Julho</option>
          <option value="7">Agosto</option>
          <option value="8">Setembro</option>
          <option value="9">Outubro</option>
          <option value="10">Novembro</option>
          <option value="11">Dezembro</option>
        </select>
      </div>
      <ScheduleGrid nurses={nurses} daysInMonth={daysInMonth} year={year} month={month} />
    </div>
  );
};

export default SchedulePage;