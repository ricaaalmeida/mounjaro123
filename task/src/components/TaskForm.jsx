import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'

const TaskForm = ({ task, onTaskSaved, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert("O título é obrigatório!")
      return
    }

    setLoading(true)

    const newTask = {
      id: task ? task.id : Date.now(), // Simula um ID para novas tarefas
      title: title.trim(),
      description: description.trim(),
      completed: task ? task.completed : false,
    }

    onTaskSaved(newTask)
    setTitle('')
    setDescription('')
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {task ? 'Editar Tarefa' : 'Nova Tarefa'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da tarefa (opcional)"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (task ? 'Atualizar' : 'Adicionar')}
            </Button>
            {task && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default TaskForm

