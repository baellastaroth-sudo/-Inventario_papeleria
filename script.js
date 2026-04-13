// 1. MODELO (Clase POO)
class Producto {
    constructor(codigo, nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
    }
    calcularTotal() {
        return this.precio * this.cantidad;
    }
}

// 2. BASE DE DATOS (Arreglo en memoria)
let inventario = [];

// 3. VISTA (Referencias al HTML)
const codigoInput = document.getElementById('codigo');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const cantidadInput = document.getElementById('cantidad');
const btnAgregar = document.getElementById('btnAgregar');
const btnLimpiar = document.getElementById('btnLimpiar');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const totalGeneralSpan = document.getElementById('totalGeneralValor');

// 4. CONTROLADOR (Funciones)
function actualizarTablaYTotal() {
    cuerpoTabla.innerHTML = '';
    if (inventario.length === 0) {
        cuerpoTabla.innerHTML = '<tr class="fila-vacia"><td colspan="5">No hay productos registrados</td></tr>';
        totalGeneralSpan.textContent = '0.00';
        return;
    }
    let totalGeneral = 0;
    inventario.forEach((producto) => {
        const totalLinea = producto.calcularTotal();
        totalGeneral += totalLinea;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td><strong>$${totalLinea.toFixed(2)}</strong></td>
        `;
        cuerpoTabla.appendChild(fila);
    });
    totalGeneralSpan.textContent = totalGeneral.toFixed(2);
}

function validarDatos(codigo, nombre, precio, cantidad) {
    if (codigo.trim() === '' || nombre.trim() === '') { alert('❌ Error: Código y Nombre son obligatorios.'); return false; }
    if (isNaN(precio) || precio <= 0) { alert('❌ Error: El Precio debe ser un número mayor a 0.'); return false; }
    if (isNaN(cantidad) || cantidad <= 0) { alert('❌ Error: La Cantidad debe ser un número entero mayor a 0.'); return false; }
    return true;
}

function manejarAgregarProducto() {
    const codigo = codigoInput.value;
    const nombre = nombreInput.value;
    const precio = Number(precioInput.value);
    const cantidad = Number(cantidadInput.value);
    if (!validarDatos(codigo, nombre, precio, cantidad)) return;
    
    const nuevoProducto = new Producto(codigo, nombre, precio, cantidad);
    inventario.push(nuevoProducto);
    limpiarFormulario();
    actualizarTablaYTotal();
}

function limpiarFormulario() {
    codigoInput.value = ''; nombreInput.value = ''; precioInput.value = ''; cantidadInput.value = '';
    codigoInput.focus();
}

// 5. EVENTOS
btnAgregar.addEventListener('click', manejarAgregarProducto);
btnLimpiar.addEventListener('click', limpiarFormulario);
cantidadInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') manejarAgregarProducto(); });

// 6. INICIO
actualizarTablaYTotal();
console.log('Sistema Local listo. ¡A trabajar!');
