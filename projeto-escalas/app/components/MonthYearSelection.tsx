import React, { useState } from 'react'
import { MonthYearSelectorProps } from '../types';

const MonthYearSelection: React.FC<MonthYearSelectorProps> = ({onChange}) => {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = parseInt(e.target.value);
      setYear(newYear);
      onChange(newYear, month);
      };
      
      const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value);
        setMonth(newMonth);
        onChange(year, newMonth);
      };

      return (
        <div className="flex items-center space-x-4">
          <label htmlFor="year">Ano:</label>
          <select id="year" value={year} onChange={handleYearChange}>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
          <label htmlFor="month">Mês:</label>
          <select id="month" value={month} onChange={handleMonthChange}>
            <option value={1}>Janeiro</option>
            <option value={2}>Fevereiro</option>
            <option value={3}>Março</option>
            <option value={4}>Abril</option>
            <option value={5}>Maio</option>
            <option value={6}>Junho</option>
            <option value={7}>Julho</option>
            <option value={8}>Agosto</option>
            <option value={9}>Setembro</option>
            <option value={10}>Outubro</option>
            <option value={11}>Novembro</option>
            <option value={12}>Dezembro</option>
          </select>
        </div>
      );
    };


export default MonthYearSelection
