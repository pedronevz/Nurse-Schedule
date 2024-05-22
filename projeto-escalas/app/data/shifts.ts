const shifts = [
    {id: "-", description: "-", start: "00:00", end: "0:00", totalHours: "00:00", break: "00:00", workHours: "00:00" },
    { id: "M1", description: "Manhã", start: "06:00", end: "15:00", totalHours: "09:00", break: "01:00", workHours: "08:00" },
    { id: "M2", description: "Manhã", start: "06:45", end: "15:45", totalHours: "09:00", break: "01:00", workHours: "08:00" },
    { id: "S", description: "Sábado", start: "06:00", end: "16:00", totalHours: "10:00", break: "01:00", workHours: "09:00" },
    { id: "T", description: "Tarde", start: "10:00", end: "19:00", totalHours: "09:00", break: "01:00", workHours: "08:00" },
    { id: "TN", description: "Tarde/Noite", start: "11:00", end: "20:00", totalHours: "09:00", break: "01:00", workHours: "08:00" },
    { id: "M", description: "Manhã", start: "06:45", end: "13:00", totalHours: "06:15", break: "00:15", workHours: "06:00" },
    { id: "N", description: "Noite", start: "13:45", end: "20:00", totalHours: "06:15", break: "00:15", workHours: "06:00" },
    { id: "T1", description: "Tarde", start: "13:00", end: "19:15", totalHours: "06:15", break: "00:15", workHours: "06:00" },
    { id: "S1", description: "Sábado", start: "06:45", end: "16:45", totalHours: "10:00", break: "01:00", workHours: "09:00" },
    { id: "TN1", description: "Tarde/Noite", start: "10:00", end: "20:00", totalHours: "10:00", break: "01:00", workHours: "09:00" },
    { id: "T2", description: "Tarde", start: "09:00", end: "19:00", totalHours: "10:00", break: "01:00", workHours: "09:00" },
    { id: "TN2", description: "Tarde/Noite prévio", start: "10:45", end: "19:45", totalHours: "09:00", break: "01:00", workHours: "08:00" },     
    { id: "F", description: "Folga Semanal", start: "", end: "", totalHours: "00:00", break: "", workHours: "00:00" },
    { id: "FE", description: "Férias", start: "", end: "", totalHours: "00:00", break: "", workHours: "00:00" }
];

export default shifts;