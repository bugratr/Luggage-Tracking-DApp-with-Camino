document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const checkStatusForm = document.getElementById('checkStatusForm');
    const luggageStatusDiv = document.getElementById('luggageStatus');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const luggageID = document.getElementById('luggageID').value;

        try {
            const response = await fetch('/registerLuggage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ luggageID })
            });

            const data = await response.json();

            if (data.error) {
                alert('Error registering luggage: ' + data.error);
            } else {
                alert('Luggage registered successfully!');
            }

        } catch (error) {
            alert('Error registering luggage: ' + error.message);
        }
    });

    checkStatusForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const luggageID = document.getElementById('checkLuggageID').value;

        try {
            const response = await fetch('/luggage/' + luggageID);
            const data = await response.json();

            if (data.error) {
                alert('Error fetching luggage status: ' + data.error);
            } else {
                luggageStatusDiv.innerText = 'Luggage Status: ' + data.status;
            }

        } catch (error) {
            alert('Error fetching luggage status: ' + error.message);
        }
    });
});
