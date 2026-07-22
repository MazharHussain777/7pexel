// @ts-nocheck 
// components/ArticleComments.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface Comment {
  _id?: string;
  id?: string;
  author: string;
  authorEmail?: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  parentId?: string | null;
}

interface ArticleCommentsProps {
  articleId: string | number;
  slug?: string;
}

export function ArticleComments({ articleId, slug }: ArticleCommentsProps) {
  const { isSubscribed, subscriberEmail } = useSubscription();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Load comments
  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articles/${slug}/comments`);
      const result = await response.json();

      if (result.success) {
        setComments(result.data);
      } else {
        // Fallback to mock comments
        setComments([
          {
            id: "1",
            author: "TechEnthusiast",
            content: "Great article! Really enjoyed the insights on the latest developments.",
            date: "2024-01-15T10:30:00",
            likes: 12,
            replies: [
              {
                id: "1-1",
                author: "JohnDoe",
                content: "I agree, very informative. Thanks for sharing!",
                date: "2024-01-15T11:15:00",
                likes: 3,
              },
            ],
          },
          {
            id: "2",
            author: "SarahTech",
            content: "This is exactly what I needed to know. Keep up the great work!",
            date: "2024-01-14T15:45:00",
            likes: 8,
            replies: [],
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, [fetchComments, slug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is subscribed
    if (!isSubscribed) {
      setShowSubscribePopup(true);
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        author: authorName || "Anonymous",
        authorEmail: authorEmail || subscriberEmail || "user@example.com",
        content: newComment.trim(),
      };

      const response = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const result = await response.json();

      if (result.success) {
        setNewComment("");
        fetchComments();
      } else {
        console.error("Failed to post comment:", result.error);
        alert("Failed to post comment. Please try again.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Error posting comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!isSubscribed) {
      setShowSubscribePopup(true);
      return;
    }

    if (!replyContent.trim()) return;

    try {
      const commentData = {
        author: authorName || "Anonymous",
        authorEmail: authorEmail || subscriberEmail || "user@example.com",
        content: replyContent.trim(),
        parentId,
      };

      const response = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const result = await response.json();

      if (result.success) {
        setReplyContent("");
        setReplyingTo(null);
        fetchComments();
      } else {
        console.error("Failed to post reply:", result.error);
        alert("Failed to post reply. Please try again.");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("Error posting reply. Please try again.");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Comment Form Component
  const CommentForm = ({ 
    onSubmit, 
    value, 
    onChange, 
    placeholder = "Write a comment...",
    isSubmitting = false,
    submitLabel = "Post Comment"
  }: any) => (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {authorName ? getInitials(authorName) : "?"}
        </div>
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[rgba(127,1,31,0.1)] focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] resize-vertical text-sm"
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!authorName && (
          <>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name"
              className="flex-1 px-4 py-2 rounded-xl border border-[rgba(127,1,31,0.1)] focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] text-sm"
            />
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-xl border border-[rgba(127,1,31,0.1)] focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] text-sm"
            />
          </>
        )}
        {!isSubscribed && (
          <div className="text-xs text-[#7F011F] font-medium flex items-center gap-1">
            <i className="fas fa-lock text-[10px]" />
            <span>Subscribe to comment</span>
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !value.trim() || (!isSubscribed && !showSubscribePopup)}
          className="px-5 py-2 rounded-full bg-[#7F011F] text-white text-sm font-medium hover:bg-[#a80a30] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? (
            <i className="fas fa-spinner fa-spin" />
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );

  // Comment Item Component
  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReply, setShowReply] = useState(false);

    return (
      <div className={`${depth > 0 ? "ml-6 md:ml-12" : ""}`}>
        <div className="bg-white rounded-2xl p-4 border border-[rgba(127,1,31,0.06)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              {getInitials(comment.author)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-[#2d1a1a]">
                  {comment.author}
                </span>
                <span className="text-xs text-[#6d4a4a]">{formatDate(comment.date)}</span>
              </div>
              <p className="text-[#2d1a1a] text-sm mt-1 leading-relaxed">
                {comment.content}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button className="text-xs text-[#6d4a4a] hover:text-[#7F011F] transition-colors flex items-center gap-1">
                  <i className="far fa-heart" />
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={() => {
                    if (!isSubscribed) {
                      setShowSubscribePopup(true);
                      return;
                    }
                    setReplyingTo(comment._id || comment.id || null);
                    setShowReply(!showReply);
                  }}
                  className="text-xs text-[#6d4a4a] hover:text-[#7F011F] transition-colors flex items-center gap-1"
                >
                  <i className="far fa-reply" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {showReply && replyingTo === (comment._id || comment.id) && (
          <div className="mt-3 ml-6 md:ml-12">
            <div className="bg-[#faf8f4] rounded-xl p-4">
              <CommentForm
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleSubmitReply(replyingTo!);
                }}
                value={replyContent}
                onChange={setReplyContent}
                placeholder={`Reply to ${comment.author}...`}
                isSubmitting={isSubmitting}
                submitLabel="Post Reply"
              />
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent("");
                  setShowReply(false);
                }}
                className="text-xs text-[#6d4a4a] hover:text-[#7F011F] transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply._id || reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Subscribe Popup
  const SubscribePopup = () => (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setShowSubscribePopup(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
        <div
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowSubscribePopup(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times" />
          </button>

          <div className="p-6 pt-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-3">
                <i className="fas fa-comment-dots text-2xl text-[#7F011F]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
                Subscribe to Comment
              </h3>
              <p className="text-sm text-[#666] mt-1">
                Join our community by subscribing to our newsletter. Get the latest tech news and join the conversation!
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email") as string;
                if (email && email.includes("@")) {
                  subscribe(email);
                  setShowSubscribePopup(false);
                  // Refresh comments or show success
                }
              }}
              className="mt-5"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-sm text-[#1a1a1a] placeholder:text-[#999]"
                required
              />
              <button
                type="submit"
                className="w-full mt-3 py-3 rounded-xl bg-[#7F011F] text-white font-medium text-sm transition-all hover:bg-[#a80a30]"
              >
                Subscribe & Comment
              </button>
            </form>

            <p className="text-[10px] text-[#999] text-center mt-3">
              <i className="fas fa-lock mr-1" />
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
      <h3 className="text-xl font-bold text-[#2d1a1a] mb-6 font-['Poppins',sans-serif] flex items-center gap-2">
        <i className="fas fa-comments text-[#7F011F]" />
        Comments
        <span className="text-sm font-normal text-[#6d4a4a] ml-2">
          ({comments.length})
        </span>
      </h3>

      {/* Comment Form */}
      <div className="mb-8">
        <CommentForm
          onSubmit={handleSubmitComment}
          value={newComment}
          onChange={setNewComment}
          placeholder={isSubscribed ? "Write a comment..." : "Subscribe to comment..."}
          isSubmitting={isSubmitting}
          submitLabel="Post Comment"
        />
        {!isSubscribed && (
          <div className="mt-3 p-3 bg-[#f5ebd0]/30 rounded-xl border border-[rgba(127,1,31,0.06)] flex items-center gap-3">
            <i className="fas fa-lock text-[#7F011F] text-xs" />
            <p className="text-xs text-[#6d4a4a]">
              <span className="font-medium">Subscribe to comment</span> — Join our community and share your thoughts
            </p>
            <button
              onClick={() => setShowSubscribePopup(true)}
              className="ml-auto text-xs font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors"
            >
              Subscribe Now →
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <i className="fas fa-spinner fa-spin text-2xl text-[#7F011F]/40" />
          <p className="text-[#6d4a4a] mt-2 text-sm">Loading comments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <i className="fas fa-exclamation-circle text-2xl text-red-500/40" />
          <p className="text-[#6d4a4a] mt-2 text-sm">{error}</p>
          <button
            onClick={fetchComments}
            className="mt-2 text-xs text-[#7F011F] hover:underline"
          >
            Try again
          </button>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment._id || comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <i className="fas fa-comment-slash text-3xl text-[#7F011F]/20 mb-3 block" />
          <p className="text-[#6d4a4a] font-['Poppins',sans-serif] text-sm">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}

      {/* Subscribe Popup */}
      {showSubscribePopup && <SubscribePopup />}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-95 {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation-duration: 200ms;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
      `}</style>
    </div>
  );
}