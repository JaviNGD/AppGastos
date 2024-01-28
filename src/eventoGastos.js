import { toggleFormularioGasto } from "./eventoBtnFormularioGasto";

const contenedorGastos = document.getElementById('gastos');

contenedorGastos.addEventListener('click', (e) => {
    const gasto = e.target.closest('.gasto');

    if (gasto) {
        if (gasto.scrollLeft > 0) {
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        } else {
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        }
    }

    if (e.target.closest('[data-accion="editar-gasto"]')){
        // Se obtiene el id del gasto a editar
        const id = gasto.dataset.id;
        
        // Se obtiene el gasto desde el localStorage
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let descripcion = '';
        let precio = '';

        // Comprueba si existen gastos guardados
        if (gastosGuardados && gastosGuardados.length > 0){
             gastosGuardados.forEach((gasto) => {
                if (gasto.id === id) {
                    descripcion = gasto.descripcion;
                    precio = gasto.precio;
                }
            });

            // Se obtiene el formulario
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;

            // Se muestra el formulario
            toggleFormularioGasto('editarGasto');
        }
    }
});