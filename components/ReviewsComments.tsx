// components/ReviewsComments.tsx
"use client";

import { useState } from "react";

interface Comment {
  id: number;
  avatar: string;
  date: string;
  content: string;
}

interface ReviewsCommentsProps {
  reviewId: string | number;
}

const mockComments: Comment[] = [
  {
    id: 1,
    avatar: "https://ui-avatars.com/api/?background=7F011F&color=fff&size=40&bold=true",
    date: "2 hours ago",
    content: "Excellent review! I've been considering these headphones and this really helped me make a decision."
  },
  {
    id: 2,
    avatar: "https://ui-avatars.com/api/?background=2d1a1a&color=fff&size=40&bold=true",
    date: "1 hour ago",
    content: "I completely agree with the verdict. The noise cancellation is truly industry-leading."
  },
  {
    id: 3,
    avatar: "https://ui-avatars.com/api/?background=c94a6a&color=fff&size=40&bold=true",
    date: "3 hours ago",
    content: "Thanks for the detailed breakdown. The pros and cons section was very helpful."
  },
  {
    id: 4,
    avatar: "https://ui-avatars.com/api/?background=1a3a4a&color=fff&size=40&bold=true",
    date: "4 hours ago",
    content: "I've been waiting for this review! Already ordered based on your recommendation."
  },
  {
    id: 5,
    avatar: "https://ui-avatars.com/api/?background=5a2a2a&color=fff&size=40&bold=true",
    date: "3 hours ago",
    content: "Great review! Would love to see a comparison with other products in this price range."
  },
  {
    id: 6,
    avatar: "https://ui-avatars.com/api/?background=4a2a6a&color=fff&size=40&bold=true",
    date: "5 hours ago",
    content: "The photography examples really showcase the camera capabilities perfectly."
  },
  {
    id: 7,
    avatar: "https://ui-avatars.com/api/?background=2a5a3a&color=fff&size=40&bold=true",
    date: "6 hours ago",
    content: "Very thorough and unbiased review. Exactly what I was looking for."
  },
  {
    id: 8,
    avatar: "https://ui-avatars.com/api/?background=7F011F&color=fff&size=40&bold=true",
    date: "5 hours ago",
    content: "The battery life testing was particularly useful. Thanks for the great content!"
  }
];

export function ReviewsComments({ reviewId }: ReviewsCommentsProps) {
  const [comments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const initialDisplayCount = 3;
  const visibleComments = showAllComments ? comments : comments.slice(0, initialDisplayCount);
  const hasMoreComments = comments.length > initialDisplayCount;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setNewComment("");
      alert("Comment posted successfully!");
    }, 500);
  };

  const CommentItem = ({ comment }: { comment: Comment }) => {
    return (
      <div className="flex gap-3 py-3 border-b border-[rgba(127,1,31,0.06)] last:border-0">
        {/* Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={comment.avatar} 
            alt="User" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#6d4a4a]">{comment.date}</span>
          </div>
          <p className="text-sm text-[#2d1a1a] leading-relaxed">
            {comment.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
            <i className="fas fa-comment-dots text-[#7F011F] text-base" />
            Reviews Comments
          </h3>
          <span className="text-[10px] font-medium bg-[#f5ebd0] text-[#6d4a4a] px-2.5 py-0.5 rounded-full">
            {comments.length}
          </span>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src="https://ui-avatars.com/api/?background=7F011F&color=fff&size=40&bold=true" 
              alt="You" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts on this review..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-[3px] border border-[rgba(127,1,31,0.08)] focus:border-[#7F011F] focus:shadow-[0_0_0_2px_rgba(127,1,31,0.06)] outline-none transition-all text-sm text-[#2d1a1a] placeholder:text-[#6d4a4a]/40 resize-none bg-[#faf8f4]"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="px-5 py-1.5 bg-[#7F011F] text-white text-sm font-medium rounded-[3px] hover:bg-[#a80a30] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane text-xs" />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <>
          <div className="divide-y divide-[rgba(127,1,31,0.04)]">
            {visibleComments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {hasMoreComments && (
            <div className="text-center mt-4 pt-4 border-t border-[rgba(127,1,31,0.06)]">
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors"
              >
                {showAllComments ? (
                  <>
                    <i className="fas fa-chevron-up text-[10px]" />
                    Show Less
                  </>
                ) : (
                  <>
                    <i className="fas fa-chevron-down text-[10px]" />
                    Show {comments.length - initialDisplayCount} More Comments
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <i className="fas fa-comment text-3xl text-[#7F011F]/10 mb-3 block" />
          <p className="text-[#6d4a4a] text-sm">No comments yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
}