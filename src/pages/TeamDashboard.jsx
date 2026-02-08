import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { getMyTasks } from '../api/tasks'
import { getUser } from '../lib/auth'

export default function TeamDashboard() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getUser()
        
        if (!currentUser || currentUser.role !== 'team') {
          navigate('/login')
          return
        }

        setUser(currentUser)

        // Fetch tasks assigned to user
        const userTasks = await getMyTasks(currentUser.id)
        setTasks(userTasks)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  // Update task status to done
  const markTaskDone = async (taskId) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: 'done' })
        .eq('id', taskId)

      if (error) {
        console.error('Error updating task:', error)
        return
      }

      // Re-fetch tasks after update
      const userTasks = await getMyTasks(user.id)
      setTasks(userTasks)
    } catch (err) {
      console.error('Error marking task done:', err)
    }
  }

  // Compute metrics from frontend
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Team Dashboard</h1>
      
      {user && (
        <p style={{ marginBottom: '20px' }}>
          Welcome, {user.email}
        </p>
      )}

      {/* Performance Metrics */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div>
          <strong>Total Tasks:</strong> {totalTasks}
        </div>
        <div>
          <strong>Completed:</strong> {completedTasks}
        </div>
      </div>

      <h2 style={{ marginBottom: '15px' }}>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              style={{ 
                padding: '10px', 
                border: '1px solid #ccc', 
                marginBottom: '8px',
                borderRadius: '4px'
              }}
            >
              <strong>{task.title}</strong>
              <br />
              <span style={{ color: '#666', fontSize: '14px' }}>
                Status: {task.status || 'N/A'}
              </span>
              <br />
              {task.status !== 'done' && (
                <button
                  onClick={() => markTaskDone(task.id)}
                  style={{
                    marginTop: '8px',
                    padding: '4px 8px',
                    fontSize: '12px'
                  }}
                >
                  Mark Done
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

