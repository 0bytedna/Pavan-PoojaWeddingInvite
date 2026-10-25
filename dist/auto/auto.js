/* Guided invitation tour. The main invitation remains fully untouched at /. */
(() => {
  const returning = new URLSearchParams(location.search).has("done");
  const videos = [...document.querySelectorAll(".film-band video")];
  const portal = document.getElementById("world-portal-link");
  let running = false, held = false, inFilm = false, inWorld = false, raf = 0;
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
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  const start = () => { if (!running && !held && !inFilm && !inWorld) { running = true; last = performance.now(); raf = requestAnimationFrame(step); } };
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
    // 46px/sec lets the 181-frame hero sequence breathe rather than jump.
    window.scrollBy(0, 46 * dt);
    if (window.scrollY + innerHeight >= document.documentElement.scrollHeight - 3) { stop(); return; }
    raf = requestAnimationFrame(step);
  };
  const hold = () => { held = true; stop(); };
  const release = () => { held = false; start(); };
  addEventListener("pointerdown", hold, { passive: true });
  addEventListener("pointerup", release, { passive: true });
  addEventListener("pointercancel", release, { passive: true });

  waitForOpen().then(waitForLoader).then(() => {
    if (returning) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    setTimeout(start, 900);
  });
})();
