// Prevent Reddit from overwriting the current tab's URL when opening a thread in a new tab
window.addEventListener("click", (e) => {
  const composedPath = e.composedPath(); // 
  const link = composedPath.find((el) => el?.tagName === "A");
  if (!link) return;

  const href = link.getAttribute("href");
  const target = link.getAttribute("target");

  const isThread = /^\/r\/[^\/]+\/comments\//.test(href);
  const currentIsThread = /^\/r\/[^\/]+\/comments\//.test(window.location.pathname);

  // If user is clicking a thread link with target=_blank, and we're not already in a thread,
  // stop Reddit's router from hijacking the click and rewriting the original tab's URL.
  if (target === "_blank" && isThread && !currentIsThread) {
    e.preventDefault();
    window.open(link.href, "_blank");
    e.stopPropagation();
  }
}, true);
