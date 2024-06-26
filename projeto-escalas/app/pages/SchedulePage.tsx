"use client"
import NurseSelection from "../components/NurseSelection";
import MonthYearSelection from "../components/MonthYearSelection";
import React, { useEffect, useState } from 'react';
import ScheduleViewer from "../components/ScheduleViewer";
import { NurseSchedule } from "../types"

const SchedulePage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [nurseId, setNurseId] = useState<number | null>(null);
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [schedule, setSchedule] = useState<NurseSchedule | null>(null);
  
  const fetchSchedule = async (nurseId: number, year: number, month: number) => {
    try {
      const response = await fetch(`http://localhost:4000/schedule/${nurseId}/${year}/${month}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar a escala');
      }
      const data = await response.json();
      if (data) {
        setSchedule(data);
      } else {
        console.error('Os dados da escala estão vazios ou indefinidos.');
      }
    } catch (error) {
      console.error('Erro ao buscar a escala:', error);
      setSchedule(null); // Definir o estado para null em caso de erro
    }
  ;
  }

  useEffect(() => {
    if (nurseId !== null) {
      fetchSchedule(nurseId, year, month);
    }
  }, [nurseId, year, month]);
;  
  

  const handleNurseChange = (nurseId: number | null) => {
    setNurseId(nurseId);
  };

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  
  const handleShiftChange = async (day: string, newShift: string) => {
    if (nurseId === null || !schedule) return;
    const updatedSchedule = {
      ...schedule,
      schedule: {
        ...schedule.schedule,
        [day]: newShift,
      },
    };
    setSchedule(updatedSchedule);
    console.log('A', updatedSchedule)
    try {
      const response = await fetch(`http://localhost:4000/schedule`, {
        method: 'POST',
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
  
  
  return (
    <div>
      <h1>Escala</h1>
        <NurseSelection onChange={handleNurseChange}></NurseSelection>
        {nurseId !== null && (
          <div>
            <MonthYearSelection onChange={handleDateChange} />
          {schedule ? (
            <ScheduleViewer schedule={schedule.schedule} onShiftChange={handleShiftChange} />
          ) : (
            <p>Sem escala!</p>
          )}
          </div>
        )}
    </div>
  );
};
  export default SchedulePage;