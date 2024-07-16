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
