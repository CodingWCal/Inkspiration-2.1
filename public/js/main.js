// main.js – Frontend JS

// Adds like a drop down toggle for project details based on ID on each saved project
//Also added rotate arrow down when expand details, using Tailwind classes
function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);

  details.classList.toggle('hidden');
  arrow.classList.toggle('rotate-90');
}
