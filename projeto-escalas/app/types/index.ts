export interface Nurse {
    id: number;
    name: string;
    coren: string;
}
  
export interface MonthYearSelectorProps {
    onChange: (year: number, month: number) => void;
  }
