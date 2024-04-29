import React from 'react'
import { Nurse, ScheduleGridProps } from '../types';

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ nurses, daysInMonth }) => {
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left pl-4">Colaborador</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th key={i} className="px-5 py-2">Dia {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse: Nurse) => (
            <tr key={nurse.id} className="text-left border-b border-gray-200">
              <td className="px-4 py-2">{nurse.name}</td>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <td key={i} className="px-2 py-2">
                  <input type="text" placeholder="H" className="border p-1 w-full text-center" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ScheduleGrid;
