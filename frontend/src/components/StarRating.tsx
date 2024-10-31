// frontend/src/components/StarRating.tsx

interface StarRatingProps {
    rating: number; // Expect a number between 0 and 5
  }
  
  export default function StarRating({ rating }: StarRatingProps) {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} // Yellow for filled stars, gray for empty
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.065 5.639 1.672 8.055L12 18.769l-7.607 4.231L6.065 14.945 0 9.306l8.332-1.151L12 .587z" />
          </svg>
        ))}
      </div>
    );
  }
  