const streaks = [
  { top: "12%", delay: "0s", width: "18rem" },
  { top: "28%", delay: "2.4s", width: "14rem" },
  { top: "54%", delay: "4.8s", width: "24rem" },
  { top: "72%", delay: "7.2s", width: "16rem" },
];

export function LightStreaks() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {streaks.map((streak) => (
        <span
          key={`${streak.top}-${streak.delay}`}
          className="light-streak"
          style={{
            top: streak.top,
            animationDelay: streak.delay,
            width: streak.width,
          }}
        />
      ))}
    </div>
  );
}
