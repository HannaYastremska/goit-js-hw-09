// 1. Оголошуємо об'єкт formData поза будь-якими функціями
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 3. При завантаженні сторінки перевіряємо LocalStorage та заповнюємо форму
populateForm();

// 2. Делегування події input для збереження даних у LocalStorage
form.addEventListener('input', onFormInput);

function onFormInput(event) {
  // Оновлюємо значення у formData за атрибутом name (email або message)
  formData[event.target.name] = event.target.value.trim();

  // Записуємо оновлений об'єкт formData в LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для заповнення полів форми даними зі сховища
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  // Якщо дані є в сховищі, парсимо їх та заповнюємо форму й об'єкт formData
  if (savedData) {
    const parsedData = JSON.parse(savedData);

    // Оновлюємо наш глобальний об'єкт formData
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    // Заповнюємо фізичні поля форми на сторінці
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
}

// 4. Обробка відправлення форми (подія submit)
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  // Забороняємо стандартне перезавантаження сторінки
  event.preventDefault();

  // Перевіряємо, чи заповнені обидва поля
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return; // Перериваємо виконання функції
  }

  // Якщо все заповнено — виводимо об'єкт у консоль
  console.log('Submitted Data:', formData);

  // Очищаємо форму, LocalStorage та об'єкт formData
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
}
