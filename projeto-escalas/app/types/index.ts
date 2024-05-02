export interface Nurse {
    id: number;
    name: string;
}
  
export interface ScheduleGridProps {
    nurses: Nurse[];
    daysInMonth: number;
    year: number;
    month: number;
}

