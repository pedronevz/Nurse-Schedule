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
  const [nurseInfo, setNurseInfo] = useState<{ name: string, coren: string }>({ name: '', coren: '' });
  const [showNurseForm, setShowNurseForm] = useState<boolean>(false); // Estado para controlar a visibilidade do cadastro de enfermeiro

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
  
  const handleAddNurse = async () => {
    const newNurse = nurseInfo;
    // Enviar requisição POST para o backend para criar um novo enfermeiro
    const response = await fetch('http://localhost:4000/nurse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNurse),
    });

    if (response.ok) {
      // Atualizar a lista de enfermeiros
      setNurseInfo({ name: '', coren: '' });
      setShowNurseForm(false); // Ocultar o formulário após o cadastro
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNurseInfo({ ...nurseInfo, [name]: value });
  };

  const handleShowNurseForm = () => {
    setShowNurseForm(true);
  };
  
  return (
    <div>
      <h1>Escala</h1>
        <button onClick={handleShowNurseForm}>Cadastrar Enfermeiro</button>
        {showNurseForm && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nome do Enfermeiro"
            value={nurseInfo.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="coren"
            placeholder="COREN"
            value={nurseInfo.coren}
            onChange={handleInputChange}
          />
          <button onClick={handleAddNurse}>Cadastrar</button>
          <button onClick={() => setShowNurseForm(false)}>Cancelar</button>
        </div>
        )}
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