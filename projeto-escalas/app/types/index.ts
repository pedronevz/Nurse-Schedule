export interface Nurse {
    id: number;
    name: string;
    coren: string;
}

export interface NurseSchedule{
    id: number;
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

export interface MonthYearSelectorProps {
    onChange: (year: number, month: number) => void;
  }
