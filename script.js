/* =====================================================
   Bike Showroom — App Logic
   Steps: 1) fill filter dropdowns  2) render bike cards
          3) filter cards live  4) show modal on click
          5) calculate EMI  6) handle the enquiry form
   ===================================================== */

// ---------- 1. Elements ----------
const bikeGrid      = document.getElementById("bikeGrid");
const brandFilter   = document.getElementById("brandFilter");
const typeFilter    = document.getElementById("typeFilter");
const priceFilter   = document.getElementById("priceFilter");
const priceValue    = document.getElementById("priceValue");
const resultCount   = document.getElementById("resultCount");

const modal         = document.getElementById("bikeModal");
const closeModalBtn = document.getElementById("closeModal");

let selectedBike = null; // bike currently open in the modal

// ---------- 2. Helper: format a number as Indian Rupees ----------
function formatRupees(num) {
  return Math.round(num).toLocaleString("en-IN");
}

// ---------- 3. Fill the Brand and Type dropdowns from bikesData ----------
function fillFilterOptions() {
  const brands = [...new Set(bikesData.map(function (b) { return b.brand; }))];
  const types  = [...new Set(bikesData.map(function (b) { return b.type; }))];

  brands.forEach(function (brand) {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandFilter.appendChild(opt);
  });

  types.forEach(function (type) {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    typeFilter.appendChild(opt);
  });

  // Also fill the "Bike interested in" dropdown on the enquiry form
  const custBike = document.getElementById("custBike");
  bikesData.forEach(function (bike) {
    const opt = document.createElement("option");
    opt.value = bike.name;
    opt.textContent = bike.name;
    custBike.appendChild(opt);
  });
}

// ---------- 4. Draw the bike cards that match the current filters ----------
function renderBikes() {
  const brand = brandFilter.value;
  const type  = typeFilter.value;
  const maxPrice = Number(priceFilter.value);

  const matches = bikesData.filter(function (bike) {
    const brandOk = brand === "all" || bike.brand === brand;
    const typeOk  = type === "all" || bike.type === type;
    const priceOk = bike.price <= maxPrice;
    return brandOk && typeOk && priceOk;
  });

  resultCount.textContent = matches.length + " bike(s) found";

  bikeGrid.innerHTML = matches.map(function (bike) {
    return (
      '<div class="bike-card" data-id="' + bike.id + '">' +
        '<div class="emoji">' + bike.emoji + '</div>' +
        '<h3>' + bike.name + '</h3>' +
        '<p class="tag">' + bike.brand + ' · ' + bike.type + '</p>' +
        '<p class="price">₹' + formatRupees(bike.price) + '</p>' +
      '</div>'
    );
  }).join("");

  // Make every card clickable (open the modal)
  document.querySelectorAll(".bike-card").forEach(function (card) {
    card.addEventListener("click", function () {
      const id = Number(card.dataset.id);
      openModal(id);
    });
  });
}

// ---------- 5. Open the detail modal for one bike ----------
function openModal(id) {
  selectedBike = bikesData.find(function (b) { return b.id === id; });
  if (!selectedBike) return;

  document.getElementById("modalEmoji").textContent = selectedBike.emoji;
  document.getElementById("modalName").textContent = selectedBike.name;
  document.getElementById("modalBrandType").textContent = selectedBike.brand + " · " + selectedBike.type;
  document.getElementById("modalPrice").textContent = "₹" + formatRupees(selectedBike.price);

  document.getElementById("modalSpecs").innerHTML =
    "<li>Engine: " + selectedBike.engine + "</li>" +
    "<li>Power: " + selectedBike.power + "</li>" +
    "<li>Mileage: " + selectedBike.mileage + "</li>";

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal(); // click outside the card closes it
});

// ---------- 6. "Check EMI for this bike" button inside the modal ----------
document.getElementById("modalEmiBtn").addEventListener("click", function () {
  if (!selectedBike) return;
  document.getElementById("emiPrice").value = selectedBike.price;
  document.getElementById("emiBikeName").textContent = selectedBike.name;
  closeModal();
  document.getElementById("emi").scrollIntoView({ behavior: "smooth" });
});

// ---------- 7. Filters: redraw the grid whenever a filter changes ----------
brandFilter.addEventListener("change", renderBikes);
typeFilter.addEventListener("change", renderBikes);
priceFilter.addEventListener("input", function () {
  priceValue.textContent = "₹" + formatRupees(priceFilter.value);
  renderBikes();
});

// ---------- 8. EMI calculator ----------
// Standard reducing-balance EMI formula:
//   EMI = P × r × (1+r)^n / ((1+r)^n − 1)
//   P = loan amount, r = monthly interest rate, n = months
document.getElementById("calcEmiBtn").addEventListener("click", function () {
  const price   = Number(document.getElementById("emiPrice").value) || 0;
  const down    = Number(document.getElementById("downPayment").value) || 0;
  const months  = Number(document.getElementById("tenure").value) || 1;
  const yearly  = Number(document.getElementById("interestRate").value) || 0;

  const loanAmount = Math.max(price - down, 0);
  const monthlyRate = yearly / 12 / 100;

  let emi;
  if (monthlyRate === 0) {
    emi = loanAmount / months; // 0% interest case
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  document.getElementById("loanAmount").textContent = formatRupees(loanAmount);
  document.getElementById("monthlyEmi").textContent = formatRupees(emi);
  document.getElementById("totalInterest").textContent = formatRupees(totalInterest);

  document.getElementById("emiResult").classList.remove("hidden");
});

// ---------- 9. Enquiry / test ride form ----------
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  // In a real project this would send data to a server.
  // Here we just show a thank-you message, which is enough for a demo.
  document.getElementById("formMessage").classList.remove("hidden");
  this.reset();
});

// ---------- 10. Run once when the page loads ----------
fillFilterOptions();
renderBikes();
