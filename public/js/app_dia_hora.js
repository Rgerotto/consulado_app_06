
// Função para gerar os inputs para dias de semana excluindo sábados e domingos
function generateWeekdayInputs() {
    const container = document.getElementById('inputContainer');
    container.innerHTML = '';  // Limpar qualquer conteúdo prévio

    const today = new Date();
    let currentDate = new Date(today);
    let inputsGenerated = 0;

    // Estabelecer a condição que enquanto não se tenham gerado 5 inputs, continuar gerando
    while (inputsGenerated < 5) {
        currentDate.setDate(currentDate.getDate() + 1); // Incrementar a data em um dia
        const dayOfWeek = currentDate.getDay();

        // Ignorar sábados (6) e domingos (0)
        if (dayOfWeek !== 6 && dayOfWeek !== 0) {
            // Criar um input para cada dia de semana
            const input = document.createElement('input');
            input.type = 'button';
            input.value = currentDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric' 
            });

            // Adicionar evento de click para gerar inputs de horas disponíveis
            input.addEventListener('click', (event) => {
                console.log("Data selecionada:", event.target.value);
                generateHourInputs(currentDate);
            });

            container.appendChild(input);
            inputsGenerated++;
        }
    }
}

// Função para gerar os inputs de horas disponíveis para a data selecionada
function generateHourInputs(date) {
    const container = document.getElementById('hourInputsContainer');
    container.innerHTML = '';  // Limpar qualquer conteúdo prévio

    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']; // Horas disponíveis

    // Criar um input para cada hora disponível
    hours.forEach(hour => {
        const hourInput = document.createElement('input');
        hourInput.setAttribute("class", "hora");
        hourInput.type = 'button';
        hourInput.value = hour;
        hourInput.addEventListener('click', (event) => {
            console.log("Hora selecionada:", event.target.value);
            createSubmitButton(date, hour);
        });

        container.appendChild(hourInput);
    });
}

// Função para criar o botão de submissão do formulário
function createSubmitButton(date, hour) {
    const formattedDate = date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
    });

    console.log("Criando botão de submissão para Data:", formattedDate, "e Hora:", hour);

    // Extrair dia, mês e ano da data formatada
    const parts = formattedDate.split('/');
    const daySelect = parts[0].trim();
    const daySplit = daySelect.split(',')
    const day = daySplit[1].trim()
    console.log("teste",day)
    const month = parts[1].trim().padStart(2, '0');
    const year = parts[2].trim();
    const dateDb = `${year}/${month}/${day}`;

    console.log("Data formatada para submissão:", dateDb);

    const container = document.getElementById('hourInputsContainer');
    const existingButton = container.querySelector('button[type="submit"]');
    if (existingButton) {
        existingButton.remove();
    }

    const form = document.createElement('form');
    form.action = '/reserve_cita';
    form.method = 'post';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Reservar Cita';

    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.name = 'date';  // Nome deve corresponder ao esperado no servidor
    dateInput.value = dateDb;

    const hourInput = document.createElement('input');
    hourInput.type = 'hidden';
    hourInput.name = 'hour';  // Nome deve corresponder ao esperado no servidor
    hourInput.value = hour;

   // Pegar o id, nome e sobrenome do usuário
   const userId = document.querySelector('#user').value;
   const userName = document.querySelector('#credencial').textContent;
   const splitName = userName.split(' ');
   const firstName = splitName[1];
   const surname = splitName[2];
   console.log(surname)

   // Adicionar campos ocultos para o id, nome e sobrenome
   const userIdInput = document.createElement('input');
   userIdInput.type = 'hidden';
   userIdInput.name = 'userId';
   userIdInput.value = userId;

   const firstNameInput = document.createElement('input');
   firstNameInput.type = 'hidden';
   firstNameInput.name = 'firstName';
   firstNameInput.value = firstName;

   const surnameInput = document.createElement('input');
   surnameInput.type = 'hidden';
   surnameInput.name = 'surname';
   surnameInput.value = surname;

   form.appendChild(dateInput);
   form.appendChild(hourInput);
   form.appendChild(userIdInput);
   form.appendChild(firstNameInput);
   form.appendChild(surnameInput);
   form.appendChild(submitButton);
   container.appendChild(form);
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', generateWeekdayInputs);

// Atualizar os inputs de data a cada 24 horas
setInterval(generateWeekdayInputs, 24 * 60 * 60 * 1000);
