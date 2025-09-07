import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Trash2, Edit } from 'lucide-react'

const TaskList = ({ onEditTask, onDeleteTask, refreshTrigger }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const response = await fetch('/tasks.json')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [refreshTrigger])

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    onDeleteTask()
  }

  if (loading) {
    return <div className="text-center">Carregando tarefas...</div>
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Nenhuma tarefa encontrada. Adicione uma nova tarefa!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id, task.completed)}
                />
                <CardTitle className={`text-lg ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </CardTitle>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditTask(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {task.description && (
            <CardContent className="pt-0">
              <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default TaskList

