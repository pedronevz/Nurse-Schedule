"use client"
import MonthYearSelection from "../components/MonthYearSelection";
import React, { useEffect, useState } from 'react';
import ScheduleViewer from "../components/ScheduleViewer";
import { NurseSchedule } from "../types"

const SchedulePage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [schedule, setSchedule] = useState<NurseSchedule | null>(null);
  
  const fetchSchedule = async (year: number, month: number) => {
    try {
      const response = await fetch(`http://localhost:4000/schedule/1/${year}/${month}`);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar a escala');
      }
      const data = await response.json();
      setSchedule(data);
    } 
    catch (error) {
      console.error('Erro ao buscar a escala:', error);
      setSchedule(null); // Definir o estado para null em caso de erro
    }
  };

  useEffect(() => {
    fetchSchedule(year, month);
  }, [year, month]);

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleShiftChange = async (day: string, newShift: string) => {
    if (!schedule) return;
    const updatedSchedule = { ...schedule };
    updatedSchedule.schedule[day] = newShift;
    setSchedule(updatedSchedule);

    try {
      const response = await fetch(`http://localhost:4000/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSchedule),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o turno');
      }
    } catch (error) {
      console.error('Erro ao atualizar o turno:', error);
    }
  };
  
  console.log(schedule)
  return (
    <div>
      <h1>Escala</h1>
      <div>
        <MonthYearSelection onChange={handleDateChange} />
      </div>
      {schedule ? (
        <ScheduleViewer schedule={schedule.schedule} onShiftChange={handleShiftChange} />
      ) : (
        <p>Sem escala!</p>
      )}
    </div>
  );
};
  export default SchedulePage;