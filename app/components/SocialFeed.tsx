'use client'

import { useState, useEffect } from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import PostCard from './PostCard'

interface User {
  id: string
  companyName: string
  profilePic?: string
}

interface Comment {
  id: string
  content: string
  createdAt: string
  user: User
}

interface Post {
  id: string
  content: string
  createdAt: string
  user: User
  comments: Comment[]
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data = await response.json()
      setPosts(data.posts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPost.trim() }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create post')
      }

      const data = await response.json()
      setPosts([data.post, ...posts])
      setNewPost('')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCommentAdded = (postId: string, newComment: Comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-200 animate-pulse rounded-xl h-32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-40" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">{error}</div>
        <button
          onClick={fetchPosts}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmitPost} className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-sm">You</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share something with fellow indie makers..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={500}
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {newPost.length}/500 characters
                </span>
                <button
                  type="submit"
                  disabled={!newPost.trim() || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperPlaneTilt size={16} />
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No posts yet</div>
          <p className="text-sm text-gray-400">
            Be the first to share something with the community!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onCommentAdded={handleCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  )
}