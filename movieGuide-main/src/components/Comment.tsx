import { FC } from 'react';
import { useParams } from "react-router-dom";
import { useGetMovieReviewsQuery } from "../features/movieApi";
import { FaFire } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

const Comment: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: reviewsData, isLoading, error } = useGetMovieReviewsQuery(id ?? "");

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-gray-600 animate-pulse">Loading comments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-red-500">Failed to load comments. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Comment Form */}
        <div className="flex gap-4 items-center border-b-2 pb-4">
          <div className="bg-blue-600 text-white py-2 px-4 rounded-lg" role="status">
            {reviewsData?.total_results || 0} Comments
          </div>
          <div className="flex-1">
            <label htmlFor="comment" className="sr-only">Add a comment</label>
            <textarea
              id="comment"
              className="bg-white border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a comment..."
              rows={2}
              aria-label="Comment text"
            />
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6 mt-4" role="feed" aria-label="Comments list">
          {reviewsData?.results?.map((review) => (
            <article key={review.id} className="flex flex-col md:flex-row gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  src="/default_avatar.webp"
                  alt={`${review.author_details?.username || review.author}'s avatar`}
                  loading="lazy"
                />
              </div>

              {/* Comment Content */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <p className="text-lg font-semibold">
                    {review.author_details?.username || review.author}
                  </p>
                  <time className="text-sm text-gray-500" dateTime={review.created_at}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-gray-700 mt-2">{review.content}</p>

                {/* Comment Actions */}
                <div className="flex gap-4 mt-4">
                  <button 
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Like comment"
                  >
                    <FaFire aria-hidden="true" />
                    <span>Like</span>
                  </button>
                  <button 
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Reply to comment"
                  >
                    <TiArrowBackOutline aria-hidden="true" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          {reviewsData?.results?.length === 0 && (
            <p className="text-gray-500 text-center" role="status">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
