const stars = Array.from({ length: 28 }, (_, index) => ({
  top: `${(index * 13 + 7) % 100}%`,
  left: `${(index * 19 + 11) % 100}%`,
  size: `${(index % 3) + 1}px`,
  duration: `${6 + (index % 5) * 1.4}s`,
  delay: `${(index % 7) * 0.6}s`,
}));

export function StarfieldBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="star-particle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            ["--duration" as string]: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
