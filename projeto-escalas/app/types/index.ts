export interface Nurse {
    id: number;
    name: string;
    coren: string;
}

export interface NurseSchedule{
    nurse_id: number;
    month: number;
    year: number;
    schedule: Schedule;
}

export interface Schedule {
    [day: string]: string;
}

export interface ScheduleViewerProps {
    schedule: {[day: string]: string};
    onShiftChange: (day: string, newShift: string) => void;
    isEditable: boolean;
    year: number;
    month: number;
}

export type ShiftId = "-" | "M1" | "M2" | "S" | "T" | "TN" | "M" | "N" | "T1" | "S1" | "TN1" | "T2" | "TN2" | "F" | "FE";  // Tipos de turnos possíveis

export interface Shift {
    id: ShiftId;
    description: string;
    start: string;
    end: string;
    totalHours: string;
    break: string;
    workHours: string;
}

export interface NurseSelectionProps {
    selectedNurseId: number | null;
    onChange: (nurseId: number | null) => void;
  }

export interface MonthYearSelectorProps {
    selectedMonth: number;
    selectedYear: number;
    onChange: (year: number, month: number) => void;
  }
