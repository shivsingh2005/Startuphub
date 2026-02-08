import { supabase } from '../supabaseClient'

/**
 * Get tasks assigned to a specific user
 * @param {string} userId - The user ID to filter tasks by
 * @returns {Promise<Array>} List of tasks
 */
export const getMyTasks = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tasks:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error in getMyTasks:', error)
    return []
  }
}

/**
 * Create a new task
 * @param {Object} taskData - Task data to insert
 * @returns {Promise<Object>} Created task or null
 */
export const createTask = async (taskData) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error in createTask:', error)
    return null
  }
}

/**
 * Update a task
 * @param {string} taskId - Task ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated task or null
 */
export const updateTask = async (taskId, updates) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', taskId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error in updateTask:', error)
    return null
  }
}

/**
 * Delete a task
 * @param {string} taskId - Task ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteTask = async (taskId) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Error deleting task:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error in deleteTask:', error)
    return false
  }
}

/**
 * Get all tasks for a project
 * @param {string} projectId - Project ID to filter by
 * @returns {Promise<Array>} List of tasks
 */
export const getProjectTasks = async (projectId) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching project tasks:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error in getProjectTasks:', error)
    return []
  }
}


