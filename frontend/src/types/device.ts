export interface Device {
  device_id: string;
  id: string;
  name: string;
  created_at: string;
  values: { timestamp: string; value: number }[];

}