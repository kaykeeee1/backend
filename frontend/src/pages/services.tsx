import { useEffect, useState } from 'react'
import { api } from '../api/api'

interface Service {
  id: number
  title: string
  description: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadServices() {
    try {
      const res = await api.get('/services')
      setServices(res.data)
    } catch {
      alert('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert('Preencha todos os campos')
      return
    }

    try {
      if (editingId) {
        const res = await api.put(`/services/${editingId}`, { title, description })
        setServices(prev =>
          prev.map(s => (s.id === editingId ? res.data : s))
        )
      } else {
        const res = await api.post('/services', { title, description })
        setServices(prev => [...prev, res.data])
      }

      setTitle('')
      setDescription('')
      setEditingId(null)
    } catch {
      alert('Erro ao salvar serviço')
    }
  }

  function handleEdit(service: Service) {
    setTitle(service.title)
    setDescription(service.description)
    setEditingId(service.id)
  }

  async function handleDelete(id: number) {
    if (!confirm('Excluir serviço?')) return
    await api.delete(`/services/${id}`)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-white px-6 py-8">
        <h1 className="text-xl font-semibold tracking-tight mb-10">
          🚀 Gerencie Seus Serviços
        </h1>

        <nav className="space-y-2">
          <button className="w-full rounded-lg bg-neutral-100 px-4 py-2 text-left text-sm font-medium">
            Serviços
          </button>

          <button
            onClick={logout}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 transition"
          >
            Sair
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Serviços
          </h2>
          <p className="text-neutral-500 mt-1">
            Gerencie seus serviços cadastrados
          </p>
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border"
        >
          <input
            className="rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Título do serviço"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            className="rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                  setDescription('')
                }}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        {loading ? (
          <p className="text-neutral-500">Carregando...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div
                key={service.id}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm mt-2">
                  {service.description}
                </p>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-sm px-3 py-1 rounded-md border hover:bg-neutral-100"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-sm px-3 py-1 rounded-md text-red-500 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
