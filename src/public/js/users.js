
async function modifyRole(userId) {
    const selectElement = document.getElementById(`roleSelect_${userId}`);
    const role = selectElement.value;
    try {
        const response = await fetch(`/api/users/premium/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role })
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message); 
        } else {
            throw new Error('Error al modificar el rol del usuario');
        }
    } catch (error) {
        console.error(error);
        alert('Error al modificar el rol del usuario');
    }
}
// Función para eliminar usuarios
function deleteUser() {
    fetch('/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            // Si la eliminación fue exitosa, recargar la página para mostrar los cambios
            window.location.reload();
        } else {
            // Si hubo un error, mostrar un mensaje de error
            console.error('Error al eliminar usuarios');
        }
    })
    .catch(error => {
        console.error('Error al eliminar usuarios:', error);
    });
}

// Asignar evento de click a los botones de eliminar
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.btn.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            deleteUser();
        });
    });
});

