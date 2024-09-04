import React from 'react';
import shifts from '../data/shifts';
import { ScheduleViewerProps } from '../types';
import { Shift, ShiftId } from '../types/index';
import { useState, useEffect } from 'react';


const ScheduleViewer: React.FC<ScheduleViewerProps> = ({ schedule, onShiftChange, isEditable, year, month }) => {
  if (!schedule || Object.keys(schedule).length === 0) {
    return <p>Escala ainda não carregada.</p>;
  }

  const [weeklyHours, setWeeklyHours] = useState(0);

    const calculateWeeklyHours = () => {
        let totalHours = 0;

        for (const day in schedule) {
            const shiftId = schedule[day] as ShiftId;
            const shift = shifts.find(s => s.id === shiftId);
            if (shift) {
                totalHours += parseFloat(shift.workHours);
            }
        }

        setWeeklyHours(totalHours);
    };

    useEffect(() => {
        calculateWeeklyHours();
    }, [schedule]);

    if (!schedule || Object.keys(schedule).length === 0) {
        return <p>Escala ainda não carregada.</p>;
    }

  const daysInMonth = Object.keys(schedule);
  const daysInWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const renderCalendar = () => {
    const weeks: JSX.Element[] = [];
    let currentWeek: JSX.Element[] = [];

    daysInMonth.forEach((day, index) => {
      console.log('day:', day)
        const dayOfWeek = new Date(year, month, parseInt(day)).getDay();
        console.log('dayOfWeek:', dayOfWeek)
        console.log(currentWeek)
        currentWeek.push(
            <td key={day} className="p-2 border">
                <div>{day}</div>
                {isEditable ? (
                    <select value={schedule[day]} onChange={(e) => handleShiftChange(day, e)}>
                        {shifts.map(shift => (
                            <option key={shift.id} value={shift.id}>
                                {shift.id}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{schedule[day]}</span>
                )}
            </td>
        );

        if (dayOfWeek === 6 || index === daysInMonth.length - 1) {
            weeks.push(<tr key={index}>{currentWeek}</tr>);
            currentWeek = [];
        }
    });

    return weeks;
};

  const handleShiftChange = (day: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    onShiftChange(day, e.target.value);
  };

  
  return (
    <div>
        <p>Horas trabalhadas na semana: {weeklyHours}h / 44h</p>
        <table className="border-collapse w-full text-center">
            <thead>
                <tr>
                    {daysInWeek.map(day => (
                        <th key={day} className="border p-2">{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {renderCalendar()}
            </tbody>
        </table>
    </div>
);
};


export default ScheduleViewer;