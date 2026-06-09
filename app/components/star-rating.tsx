import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface StarRatingDisplayProps {
  average: number | null;
  count: number;
  size?: "sm" | "md";
}

export function StarRatingDisplay({
  average,
  count,
  size = "md",
}: StarRatingDisplayProps) {
  if (count === 0) return null;

  const starSize = size === "sm" ? "size-3.5" : "size-4";
  const rounded = Math.round(average ?? 0);

  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            star <= rounded
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-muted-foreground/30"
          )}
        />
      ))}
      <span className="text-xs text-muted-foreground">
        {average!.toFixed(1)} ({count})
      </span>
    </span>
  );
}

interface StarRatingPickerProps {
  courseId: number;
  initialRating: number | null;
  onRate: (rating: number) => void;
}

export function StarRatingPicker({
  courseId,
  initialRating,
  onRate,
}: StarRatingPickerProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(initialRating);

  const active = hovered ?? selected;

  function handleClick(star: number) {
    setSelected(star);
    onRate(star);
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none"
          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "size-6 transition-colors",
              star <= (active ?? 0)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  );
}
