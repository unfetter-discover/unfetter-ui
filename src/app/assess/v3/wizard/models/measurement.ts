export interface Measurement {
    name: string;
    options: { name: string, risk: number }[];
    selected_value: any;
    risk: number;
}
