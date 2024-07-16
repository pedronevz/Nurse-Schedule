import React from 'react';
import shifts from '../data/shifts';
import { ScheduleViewerProps } from '../types';

const ScheduleViewer: React.FC<ScheduleViewerProps> = ({ schedule, onShiftChange }) => {
  if (!schedule || Object.keys(schedule).length === 0) {
    return <p>Escala ainda não carregada.</p>;
  }

  const daysInMonth = Object.keys(schedule);

  const handleShiftChange = (day: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    onShiftChange(day, e.target.value);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Dia</th>
          <th>Turno</th>
        </tr>
      </thead>
      <tbody>
        {daysInMonth.map(day => (
          <tr key={day}>
            <td>{day}</td>
            <td>
              <select value={schedule[day]} onChange={(e) => handleShiftChange(day, e)}>
                {shifts.map(shift => (
                  <option key={shift.id} value={shift.id}>
                    {shift.id}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default ScheduleViewer;