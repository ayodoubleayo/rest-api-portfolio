import React, { useEffect, useState } from 'react'
import api from './api'

function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => onEdit(post)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(post._id)}>Delete</button>
      </div>
    </div>
  )
}

export default function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/posts')
      setPosts(res.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        const res = await api.put(`/posts/${editingId}`, form)
        setPosts(p => p.map(x => x._id === editingId ? res.data : x))
        setEditingId(null)
      } else {
        const res = await api.post('/posts', form)
        setPosts(p => [res.data, ...p])
      }
      setForm({ title: '', content: '' })
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleEdit = (post) => {
    setEditingId(post._id)
    setForm({ title: post.title, content: post.content })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/posts/${id}`)
      setPosts(p => p.filter(x => x._id !== id))
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="container">
      <h1>REST API Portfolio — Posts</h1>

      <div className="card">
        <h2>{editingId ? 'Edit post' : 'Create post'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input"
            required
          />

          <label>Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="input"
            rows={4}
            required
          />

          <div style={{ marginTop: 8 }}>
            <button className="btn btn-primary" type="submit">
              {editingId ? 'Save' : 'Create'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setEditingId(null)
                  setForm({ title: '', content: '' })
                }}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2>All Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  )
}
