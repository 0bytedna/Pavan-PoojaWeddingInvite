/* Guided invitation tour. The main invitation remains fully untouched at /. */
(() => {
  const returning = new URLSearchParams(location.search).has("done");
  const videos = [...document.querySelectorAll(".film-band video")];
  const portal = document.getElementById("world-portal-link");
  const hero = document.getElementById("hero");
  let running = false, held = false, tourReady = false, inFilm = false, inWorld = false, raf = 0;
  let last = 0;

  // One pass is intentional: each film is a small intermission in the tour.
  videos.forEach((video, index) => {
    video.loop = false;
    video.removeAttribute("loop");
    video.dataset.tourIndex = String(index);
  });
  if (portal) portal.href = "./world/index.html?auto=1&return=../auto/?done=1";

  const waitForOpen = () => new Promise((resolve) => {
    const check = () => {
      const seal = document.getElementById("seal-btn");
      if (seal && !seal.disabled) { seal.click(); resolve(); return; }
      requestAnimationFrame(check);
    };
    check();
  });
  const waitForLoader = () => new Promise((resolve) => {
    const check = () => document.body.classList.contains("is-loading")
      ? requestAnimationFrame(check) : resolve();
    check();
  });
  const isCentered = (element) => {
    const r = element.getBoundingClientRect();
    const center = innerHeight / 2;
    return r.top <= center && r.bottom >= center;
  };
  const inViewport = (element) => {
    const r = element.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  const start = () => {
    if (!tourReady || running || held || inFilm || inWorld) return;
    running = true; last = performance.now(); raf = requestAnimationFrame(step);
  };
  const resumeAfterFilm = () => { inFilm = false; setTimeout(start, 650); };

  const playFilm = (video) => {
    if (inFilm || video.dataset.tourWatched === "yes") return;
    inFilm = true; stop();
    window.scrollTo({ top: window.scrollY + video.getBoundingClientRect().top - (innerHeight - video.getBoundingClientRect().height) / 2, behavior: "smooth" });
    setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => { video.dataset.tourWatched = "yes"; resumeAfterFilm(); });
    }, 500);
    video.addEventListener("ended", () => { video.dataset.tourWatched = "yes"; resumeAfterFilm(); }, { once: true });
  };
  const enterWorld = () => {
    if (inWorld || !portal || !isCentered(portal)) return;
    inWorld = true; stop(); portal.click();
  };
  const step = (now) => {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, .05); last = now;
    const film = videos.find((v) => v.dataset.tourWatched !== "yes" && isCentered(v));
    if (film) { playFilm(film); return; }
    if (portal && isCentered(portal)) { enterWorld(); return; }
    // Pace from the actual rendered hero height. This preserves a cinematic
    // 24-second frame sequence on full-motion devices, while the compact
    // reduced-motion hero still receives a gentle eight-second introduction.
    const heroHeight = hero?.offsetHeight || 0;
    const pixelsPerSecond = hero && inViewport(hero)
      ? Math.max(70, heroHeight / (heroHeight > innerHeight * 4 ? 24 : 8))
      : Math.max(innerHeight * .58, 430);
    window.scrollTo(0, window.scrollY + pixelsPerSecond * dt);
    if (window.scrollY + innerHeight >= document.documentElement.scrollHeight - 3) { stop(); return; }
    raf = requestAnimationFrame(step);
  };
  // Only a real guest touch controls the pause state; scripted opening of the
  // seal can never accidentally leave the tour held.
  const hold = (event) => { if (event.isTrusted) { held = true; stop(); } };
  const release = (event) => { if (event.isTrusted) { held = false; start(); } };
  addEventListener("pointerdown", hold, { passive: true });
  addEventListener("pointerup", release, { passive: true });
  addEventListener("pointercancel", release, { passive: true });

  waitForOpen().then(waitForLoader).then(() => {
    tourReady = true;
    if (returning) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    setTimeout(start, 900);
  });
})();
