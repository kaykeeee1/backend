import api from '../api/api';

export interface Service {
  id: number;
  title: string;
  description: string;
  category?: string;
  price?: number;
}

export async function getServices(): Promise<Service[]> {
  const response = await api.get<Service[]>('/services');
  return response.data;
}
