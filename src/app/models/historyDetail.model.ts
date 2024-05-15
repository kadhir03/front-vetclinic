export interface HistoryDetail {
    id?: number; 
    temperature: number;
    weight: number;
    heartRate: number;
    date: Date;
    time: string;
    observation?: string;
    userId: number;
    clinicHistoryId: number;
}
