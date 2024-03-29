const boton = document.getElementById('toggle-form-gasto');
const formularioGasto = document.getElementById('formulario-gasto');

const toggleFormularioGasto = (modo = 'agregarGasto') => {
    if ([...formularioGasto.classList].includes('formulario-gasto--active')){

        //Cerrar formulario
        boton.classList.remove('agregar-gasto__btn--active');
        formularioGasto.classList.remove('formulario-gasto--active');

    } else {

        //Abrir formulario
        boton.classList.add('agregar-gasto__btn--active');
        formularioGasto.classList.add('formulario-gasto--active');

        if (modo === 'editarGasto') {
            document.querySelector('.formulario-gasto__titulo').textContent = 'Editar Gasto';
            document.querySelector('.formulario-gasto__btn').textContent = 'Guardar';
            document.getElementById('formulario-gasto').dataset.modo = 'editarGasto';
        } else {
            // Se limpia el formulario
            document.getElementById('descripcion').value = '';
            document.getElementById('precio').value = '';

            document.querySelector('.formulario-gasto__titulo').textContent = 'Agregar Gasto';
            document.querySelector('.formulario-gasto__btn').textContent = 'Agregar  Gasto';
            document.getElementById('formulario-gasto').dataset.modo = 'agregarGasto';
        
        }
    };
}

boton.addEventListener('click', (e) => {
    toggleFormularioGasto();
});

export { toggleFormularioGasto };