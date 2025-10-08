const screen = document.getElementById('screen');
const keys = document.getElementById('keys');
let expression = '';

// Update the display
function updateScreen() {
  screen.textContent = expression || '0';
}

// Add value to expression
function addValue(value) {
  expression += value;
  updateScreen();
}

// Clear display
function clearScreen() {
  expression = '';
  updateScreen();
}

// Calculate result
function calculate() {
  try {
    expression = eval(expression); // simple calculation
  } catch {
    expression = 'Error';
  }
  updateScreen();
}

// Button click events
keys.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const value = btn.getAttribute('data-value');
  const action = btn.getAttribute('data-action');

  if (action === 'clear') clearScreen();
  else if (action === 'calculate') calculate();
  else if (value) addValue(value);
});

// Keyboard support
document.addEventListener('keydown', e => {
  const key = e.key;
  if ((key >= '0' && key <= '9') || ['+','-','*','/','.'].includes(key)) {
    addValue(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    expression = expression.slice(0,-1);
    updateScreen();
  } else if (key.toLowerCase() === 'c') {
    clearScreen();
  }
});
