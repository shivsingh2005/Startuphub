import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { getUser } from '../lib/auth'

export default function FounderDashboard() {
  const [user, setUser] = useState(null)
  const [startup, setStartup] = useState(null)
  const [milestones, setMilestones] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newMilestone, setNewMilestone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getUser()
        
        if (!currentUser || currentUser.role !== 'founder') {
          navigate('/login')
          return
        }

        setUser(currentUser)

        // Fetch startup created by this founder
        const { data: startupData, error: startupError } = await supabase
          .from('startups')
          .select('*')
          .eq('founder_id', currentUser.id)
          .single()

        if (startupError) {
          console.error('Error fetching startup:', startupError)
          setError('Failed to load startup data')
        } else {
          setStartup(startupData)

          // Fetch milestones for this startup
          if (startupData) {
            const { data: milestonesData, error: milestonesError } = await supabase
              .from('milestones')
              .select('*')
              .eq('startup_id', startupData.id)
              .order('created_at', { ascending: false })

            if (milestonesError) {
              console.error('Error fetching milestones:', milestonesError)
            } else {
              setMilestones(milestonesData || [])
            }

            // Fetch approved team members with profile join
            const { data: membersData, error: membersError } = await supabase
              .from('team_members')
              .select(`
                id,
                role,
                profiles:user_id (
                  name,
                  email
                )
              `)
              .eq('startup_id', startupData.id)
              .eq('status', 'approved')

            if (membersError) {
              console.error('Error fetching team members:', membersError)
            } else {
              setTeamMembers(membersData || [])
            }
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  // Add new milestone
  const handleAddMilestone = async (e) => {
    e.preventDefault()
    
    if (!newMilestone.trim() || !startup) return

    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('milestones')
        .insert({
          title: newMilestone.trim(),
          startup_id: startup.id,
          status: 'active'
        })

      if (insertError) {
        console.error('Error creating milestone:', insertError)
        return
      }

      setNewMilestone('')

      // Re-fetch milestones
      const { data: milestonesData } = await supabase
        .from('milestones')
        .select('*')
        .eq('startup_id', startup.id)
        .order('created_at', { ascending: false })

      setMilestones(milestonesData || [])
    } catch (err) {
      console.error('Error adding milestone:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Founder Dashboard</h1>
      
      {user && (
        <p style={{ marginBottom: '20px' }}>
          Welcome, {user.name || user.email}
        </p>
      )}

      {startup ? (
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          borderRadius: '4px',
          maxWidth: '400px',
          marginBottom: '20px'
        }}>
          <h2 style={{ marginBottom: '15px' }}>My Startup</h2>
          
          <p><strong>Name:</strong> {startup.name}</p>
          <p><strong>Domain:</strong> {startup.domain || 'N/A'}</p>
          <p><strong>Stage:</strong> {startup.stage || 'N/A'}</p>
        </div>
      ) : (
        <p>No startup found. Create your startup to get started.</p>
      )}

      {/* Milestones Section */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>Milestones</h2>
        
        {/* Add Milestone Form */}
        {startup && (
          <form onSubmit={handleAddMilestone} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Enter milestone title"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              style={{
                padding: '8px',
                marginRight: '8px',
                width: '250px'
              }}
            />
            <button 
              type="submit" 
              disabled={submitting || !newMilestone.trim()}
              style={{ padding: '8px 16px' }}
            >
              {submitting ? 'Adding...' : 'Add Milestone'}
            </button>
          </form>
        )}
        
        {milestones.length === 0 ? (
          <p>No milestones yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {milestones.map((milestone) => (
              <li 
                key={milestone.id} 
                style={{ 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}
              >
                <strong>{milestone.title}</strong>
                <br />
                <span style={{ color: '#666', fontSize: '14px' }}>
                  Status: {milestone.status || 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Team Members Section */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>Team Members</h2>
        
        {teamMembers.length === 0 ? (
          <p>No team members yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {teamMembers.map((member) => (
              <li 
                key={member.id} 
                style={{ 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}
              >
                <strong>{member.profiles?.name || 'Unknown'}</strong>
                <br />
                <span style={{ color: '#666', fontSize: '14px' }}>
                  Role: {member.role || 'N/A'}
                </span>
                <br />
                <span style={{ color: '#999', fontSize: '12px' }}>
                  {member.profiles?.email || ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

