import React, { useState, useEffect } from 'react';
import { Nurse, NurseSelectionProps } from '../types';

const NurseSelection: React.FC<NurseSelectionProps> = ({ selectedNurseId, onChange }) => {
    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [selectedNurse, setSelectedNurse] = useState<number | null>(selectedNurseId);
    
    useEffect(() => {
        // Função para buscar a lista de enfermeiros no backend
        const fetchNurses = async () => {
          try {
            const response = await fetch('http://localhost:4000/nurse');
            const data = await response.json();
            setNurses(data);
          } 
          catch (error) {
            console.error('Erro ao buscar enfermeiros:', error);
          }
        };
        fetchNurses();
        }, [onChange]);
    
      useEffect(() => {
        setSelectedNurse(selectedNurseId);
      }, [selectedNurseId]);

    const handleNurseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nurseId = e.target.value === "" ? null : parseInt(e.target.value);
        setSelectedNurse(nurseId);
        onChange(nurseId);
    };

    return (
        <div className="flex items-center space-x-4">
          <label htmlFor="nurse">Enfermeiro:</label>
          <select id="nurse" value={selectedNurse ?? ""} onChange={handleNurseChange}>
            <option value="">Selecione o enfermeiro</option>
            {nurses.map(nurse => (
              <option key={nurse.id} value={nurse.id}>
                {nurse.name}
              </option>
            ))}
      </select>
        </div>
    );
};

export default NurseSelection
