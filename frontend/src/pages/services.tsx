import { useEffect, useState } from 'react';
import { api } from '../api/api';

interface Service {
  id: number;
  title: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 LISTAR SERVIÇOS
  async function loadServices() {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  }

  // 🔹 CRIAR OU EDITAR SERVIÇO
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      if (editingId !== null) {
        // EDITAR
        const response = await api.put(`/services/${editingId}`, {
          title,
          description,
        });

        setServices((prev) =>
          prev.map((service) =>
            service.id === editingId ? response.data : service
          )
        );
      } else {
        // CRIAR
        const response = await api.post('/services', {
          title,
          description,
        });

        setServices((prev) => [...prev, response.data]);
      }

      // reset
      setTitle('');
      setDescription('');
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar serviço');
    }
  }

  // 🔹 EDITAR
  function handleEdit(service: Service) {
    setTitle(service.title);
    setDescription(service.description);
    setEditingId(service.id);
  }

  // 🔹 EXCLUIR
  async function handleDelete(id: number) {
    if (!window.confirm('Deseja excluir este serviço?')) return;

    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir serviço');
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
    >
      <h2>Meus Serviços</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          {editingId !== null ? 'Atualizar' : 'Adicionar'}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle('');
              setDescription('');
            }}
            style={{ marginLeft: 8 }}
          >
            Cancelar
          </button>
        )}
      </form>

      {loading && <p>Carregando...</p>}

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.title}</strong> — {service.description}

            <button
              onClick={() => handleEdit(service)}
              style={{ marginLeft: 8 }}
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(service.id)}
              style={{ marginLeft: 4 }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
