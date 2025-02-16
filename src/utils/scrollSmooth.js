export const smoothScroll = (scrollRef, scrollOffset) => {
  if (!scrollRef.current) return;
  const start = scrollRef.current.scrollLeft;
  const end = start + scrollOffset;
  const duration = 200; // 밀리초 (0.3초)
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    scrollRef.current.scrollLeft = start + (end - start) * progress;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
};