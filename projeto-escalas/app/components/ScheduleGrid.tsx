import React, { useState } from 'react'
import { Nurse, ScheduleGridProps } from '../types';
import shifts from '../data/shifts';

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ nurses, daysInMonth, year, month }) => {
  const [selectedShifts, setSelectedShifts] = useState<{ [key: string]: string }>({});

  const handleShiftChange = (nurseId: number, day: number, shiftId: string) => {
    const key = `${nurseId}-${day}`;
    setSelectedShifts(prev => ({ ...prev, [key]: shiftId }));
  };

  function getDayOfWeek(day: number) {
    const date = new Date(year, month, day);
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return daysOfWeek[date.getDay()];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left pl-4">Colaborador</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th key={i} className="px-8 py-2">{getDayOfWeek(i + 1)} {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse: Nurse) => (
            <tr key={nurse.id} className="text-left border-b border-gray-200">
              <td className="px-4 py-2">{nurse.name}</td>
              {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                <td key={dayIndex} className="px-3.5 py-2">
                  <select
                    className="border p-1 w-full"
                    value={selectedShifts[`${nurse.id}-${dayIndex}`] || ""}
                    onChange={(e) => handleShiftChange(nurse.id, dayIndex, e.target.value)}
                  >
                    <option value="">{`-`}</option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {selectedShifts[`${nurse.id}-${dayIndex}`] === shift.id ? shift.id : `${shift.id} - ${shift.description} (${shift.start}-${shift.end})`}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ScheduleGrid;
