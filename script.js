const form = document.getElementById('password-form');
const siteInput = document.getElementById('site');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const list = document.getElementById('password-list');
const generateBtn = document.getElementById('generate');

let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function encrypt(text) {
  return btoa(text); // Basic encoding
}

function decrypt(text) {
  return atob(text);
}

function savePasswords() {
  localStorage.setItem('passwords', JSON.stringify(passwords));
}

function renderPasswords() {
  list.innerHTML = '';
  passwords.forEach((entry, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${entry.site}</td>
      <td>${entry.username}</td>
      <td>
        <input type="password" value="${decrypt(entry.password)}" readonly />
        <button onclick="copyPassword(this)">Copy</button>
      </td>
      <td>
        <button class="delete" onclick="deletePassword(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function copyPassword(button) {
  const input = button.previousElementSibling;
  input.type = 'text';
  input.select();
  document.execCommand('copy');
  input.type = 'password';
}

function deletePassword(index) {
  passwords.splice(index, 1);
  savePasswords();
  renderPasswords();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const site = siteInput.value.trim();
  const username = usernameInput.value.trim();
  const password = encrypt(passwordInput.value.trim());

  if (site && username && password) {
    passwords.push({ site, username, password });
    savePasswords();
    renderPasswords();
    siteInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
  }
});

generateBtn.addEventListener('click', () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let pwd = '';
  for (let i = 0; i < 12; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = pwd;
});

renderPasswords();
