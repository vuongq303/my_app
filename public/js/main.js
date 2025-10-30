(function () {
  const thumbs = document.querySelectorAll(".thumb");
  const galleryModalEl = document.getElementById("galleryModal");
  const bsModal = new bootstrap.Modal(galleryModalEl);
  const carouselEl = document.getElementById("galleryCarousel");
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
    ride: false,
  });

  thumbs.forEach((t) => {
    t.addEventListener("click", () => {
      const index = Number(t.dataset.index || 0);
      bsCarousel.to(index);
      bsModal.show();
    });
  });

  galleryModalEl.addEventListener("shown.bs.modal", () => {
    carouselEl.focus();
  });
})();
