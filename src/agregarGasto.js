import { v4 as uuidv4 } from 'uuid';
import { toggleFormularioGasto } from './eventoBtnFormularioGasto';
import mostrarGastos from './mostrarGastos';
import mostrarTotalGastado from './mostrarTotalGastado';

const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;

const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;

const comprobarDescripcion = () => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');

        formulario.descripcion.parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        descripcion.classList.remove('formulario-gasto__input--error');

        formulario.descripcion.parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.remove('formulario-gasto__leyenda--active');

        return true;
    }   
};   

const comprobarPrecio = () => {
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');

        formulario.precio.parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        precio.classList.remove('formulario-gasto__input--error');

        formulario.precio.parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.remove('formulario-gasto__leyenda--active');

        return true;
    }   
};  

//Comprueba que la descripción no tenga errores
descripcion.addEventListener('blur', (e) => {
    comprobarDescripcion();
});

//Comprueba que la descripción no tenga errores cuando el usuario empieza a escribir y exista un error previo
descripcion.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        comprobarDescripcion();
    }
});

//Comprueba que el precio sea válido
precio.addEventListener('blur', (e) => {
    comprobarPrecio();
});

//Comprueba que el precio no tenga errores cuando el usuario empieza a escribir y exista un error previo
precio.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        comprobarPrecio();
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtiene el modo del formulario
    const modo = formulario.closest('#formulario-gasto')?.dataset?.modo;

    // Comprueba descripción y precio
   if (comprobarDescripcion() && comprobarPrecio()) {
        const nuevoGasto = {
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        };

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if (modo === 'agregarGasto') {
            if (gastosGuardados) {
                //Si hay gastos guardados, se añade el nuevo gasto al array
                const nuevosGastos = [...gastosGuardados, nuevoGasto ];
                window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
            } else {
                //Si no hay gastos guardados, se crea un array con el gasto
                window.localStorage.setItem('gastos', JSON.stringify([{...nuevoGasto }]));
            }
        } else if (modo === 'editarGasto') {
            //Se obtiene el id del gasto a editar
            const id = document.getElementById('formulario-gasto').dataset?.id;

            //Se obtiene el gasto a editar
            let indexGastoAEditar;

            if (id && gastosGuardados) {
                gastosGuardados.forEach((gasto, index) => {
                    if (gasto.id === id) {
                        indexGastoAEditar = index;
                    }
                });
            }

            //Se edita el gasto
            const nuevosGastos = [...gastosGuardados];
            nuevosGastos[indexGastoAEditar] = {
                ...gastosGuardados[indexGastoAEditar],
                descripcion: descripcion.value,
                precio: precio.value,
            }

            //Se guarda el gasto editado
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));

        }

        //Se resetea el formulario y lo cierra
        formulario.reset();
        toggleFormularioGasto();
        mostrarGastos();
        mostrarTotalGastado();
   }
});

