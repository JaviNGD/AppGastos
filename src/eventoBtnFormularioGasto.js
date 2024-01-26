const boton = document.getElementById('toggle-form-gasto');
const formularioGasto = document.getElementById('formulario-gasto');

const toggleFormularioGasto = () => {
    if ([...formularioGasto.classList].includes('formulario-gasto--active')){

        //Cerrar formulario
        boton.classList.remove('agregar-gasto__btn--active');
        formularioGasto.classList.remove('formulario-gasto--active');

    } else {

        //Abrir formulario
        boton.classList.add('agregar-gasto__btn--active');
        formularioGasto.classList.add('formulario-gasto--active');

    };
}

boton.addEventListener('click', (e) => {
    toggleFormularioGasto();
});

export { toggleFormularioGasto };