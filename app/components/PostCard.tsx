'use client'

import { useState } from 'react'
import { ChatCircle, PaperPlaneTilt } from '@phosphor-icons/react'

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

interface PostCardProps {
  post: Post
  onCommentAdded?: (postId: string, comment: Comment) => void
}

export default function PostCard({ post, onCommentAdded }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment.trim() }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add comment')
      }

      const data = await response.json()
      onCommentAdded?.(post.id, data.comment)
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        {post.user.profilePic ? (
          <img
            src={post.user.profilePic}
            alt={post.user.companyName}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {post.user.companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{post.user.companyName}</h3>
            <span className="text-gray-500 text-sm">{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 hover:text-primary-600 transition-colors"
        >
          <ChatCircle size={18} />
          <span>{post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  {comment.user.profilePic ? (
                    <img
                      src={comment.user.profilePic}
                      alt={comment.user.companyName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                      <span className="text-accent-600 font-medium text-xs">
                        {comment.user.companyName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.user.companyName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                maxLength={300}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}