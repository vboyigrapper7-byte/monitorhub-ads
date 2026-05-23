const revealItems = document.querySelectorAll(".reveal");
const chartLine = document.querySelector(".chart-line");
const billingButtons = document.querySelectorAll("[data-billing-option]");
const pricingValues = document.querySelectorAll(".plan-price strong[data-monthly][data-yearly]");
const pricingNotes = document.querySelectorAll(".price-note[data-monthly-note][data-yearly-note]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (chartLine && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const resetChart = () => {
    chartLine.style.animation = "none";
    chartLine.getBoundingClientRect();
    chartLine.style.animation = "";
  };

  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        resetChart();
      });
    },
    {
      threshold: 0.45,
    }
  );

  chartObserver.observe(chartLine);
}

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedBilling = button.dataset.billingOption;

    billingButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    pricingValues.forEach((price) => {
      price.textContent = selectedBilling === "yearly" ? price.dataset.yearly : price.dataset.monthly;
    });

    pricingNotes.forEach((note) => {
      note.textContent = selectedBilling === "yearly" ? note.dataset.yearlyNote : note.dataset.monthlyNote;
    });
  });
});
