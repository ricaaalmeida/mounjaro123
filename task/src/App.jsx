import { useState } from 'react'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import './App.css'

function App() {
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTaskSaved = (savedTask) => {
    setEditingTask(null)
    setShowForm(false)
    // Aqui você precisaria de uma lógica para atualizar o JSON real
    // Por enquanto, apenas atualizamos o refreshTrigger para simular a atualização
    setRefreshTrigger(prev => prev + 1)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleDeleteTask = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleCancel = () => {
    setEditingTask(null)
    setShowForm(false)
  }

  const handleNewTask = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciador de Tarefas
          </h1>
          <p className="text-gray-600">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Suas Tarefas
              </h2>
              {!showForm && (
                <Button onClick={handleNewTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              )}
            </div>
            <TaskList
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              refreshTrigger={refreshTrigger}
            />
          </div>

          <div>
            {showForm && (
              <TaskForm
                task={editingTask}
                onTaskSaved={handleTaskSaved}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
