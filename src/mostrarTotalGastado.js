import isThisMonth from 'date-fns/isThisMonth';
import { parseISO } from 'date-fns';

const mostrarTotalGastado = () => {
	const contenedorTotalGastado = document.getElementById('total-gastado');
	const gastos = JSON.parse(window.localStorage.getItem('gastos'));
	let total = 0;

	if (gastos) {
		const gastosDelMes = gastos.filter((gasto) => {
			if (isThisMonth(parseISO(gasto.fecha))) {
				return gasto;
			}
		});

		if (gastosDelMes) {
			gastosDelMes.forEach((gasto) => {
				total += parseFloat(gasto.precio);
			});
		}
	}
	
	const formatoMoneda = new Intl.NumberFormat('en-CL', { style: 'currency', currency: 'CLP' });
    // Muestra el total de gastos del mes
	contenedorTotalGastado.innerText = formatoMoneda.format(total);
};

export default mostrarTotalGastado;