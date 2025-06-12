const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapUnits');
const themeToggle = document.getElementById('themeToggle');

// Categories - hardcoded for initial load
const categories = [
  "Length",
  "Weight",
  "Volume",
  "Speed",
  "Temperature",
  "Time"
];

// Populate category dropdown
function populateCategories() {
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Fetch units for a category from Flask backend and populate unit dropdowns
async function populateUnits(category) {
  if (!category) return;

  // Clear current options
  fromUnitSelect.innerHTML = '<option value="" disabled selected>Select unit</option>';
  toUnitSelect.innerHTML = '<option value="" disabled selected>Select unit</option>';
  resultDiv.textContent = '';  

  try {
    const res = await fetch(`/units/${category}`);
    const units = await res.json();

    units.forEach(unit => {
      const optionFrom = document.createElement('option');
      optionFrom.value = unit;
      optionFrom.textContent = unit;
      fromUnitSelect.appendChild(optionFrom);

      const optionTo = document.createElement('option');
      optionTo.value = unit;
      optionTo.textContent = unit;
      toUnitSelect.appendChild(optionTo);
    });
  } catch (err) {
    resultDiv.textContent = 'Error loading units.';
  }
}

// Swap fromUnit and toUnit selected values
function swapUnits() {
  const temp = fromUnitSelect.value;
  fromUnitSelect.value = toUnitSelect.value;
  toUnitSelect.value = temp;
  resultDiv.textContent = '';
}

// Perform conversion by sending data to backend
async function convertUnits() {
  const category = categorySelect.value;
  const from_unit = fromUnitSelect.value;
  const to_unit = toUnitSelect.value;
  const value = inputValue.value;

  if (!category || !from_unit || !to_unit || !value) {
    resultDiv.textContent = 'Please fill out all fields.';
    return;
  }

  resultDiv.textContent = 'Converting...';

  try {
    const res = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, from_unit, to_unit, value })
    });

    const data = await res.json();

    if (res.ok) {
      resultDiv.textContent = `${value} ${from_unit} = ${data.result} ${to_unit}`;
    } else {
      resultDiv.textContent = `Error: ${data.error}`;
    }
  } catch (err) {
    resultDiv.textContent = 'Error performing conversion.';
  }
}

// Toggle dark/light theme
function toggleTheme() {
  if (themeToggle.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// Event Listeners
categorySelect.addEventListener('change', () => {
  populateUnits(categorySelect.value);
  resultDiv.textContent = '';
  inputValue.value = '';
});

swapBtn.addEventListener('click', swapUnits);

convertBtn.addEventListener('click', convertUnits);

themeToggle.addEventListener('change', toggleTheme);

// Initialize
populateCategories();
