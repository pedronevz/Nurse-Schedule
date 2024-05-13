import React, { useState } from 'react'
import { MonthYearSelectorProps } from '../types';

const MonthYearSelection: React.FC<MonthYearSelectorProps> = ({onChange}) => {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(parseInt(e.target.value));
        onChange(year, month);
      };
      
      const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(parseInt(e.target.value));
        onChange(year, month);
      };

      return (
        <div className="flex items-center space-x-4">
          <label htmlFor="year">Ano:</label>
          <select id="year" value={year} onChange={handleYearChange}>
            {/* Opções para os anos */}
          </select>
          <label htmlFor="month">Mês:</label>
          <select id="month" value={month} onChange={handleMonthChange}>
            {/* Opções para os meses */}
          </select>
        </div>
      );
    };


export default MonthYearSelection
