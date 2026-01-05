import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Service {
  id: number;
  title: string;
  description: string;
}
//  akkajaj
export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function loadServices() {
    const response = await api.get('/services');
    setServices(response.data);
  }

  async function createService(e: React.FormEvent) {
    e.preventDefault();

    await api.post('/services', {
      title,
      description,
    });

    setTitle('');
    setDescription('');
    loadServices();
  }

  async function deleteService(id: number) {
    await api.delete(`/services/${id}`);
    loadServices();
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div>
      <h2>Meus Serviços</h2>

      <form onSubmit={createService}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.title}</strong> - {service.description}
            <button onClick={() => deleteService(service.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
