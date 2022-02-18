
console.clear()
const App = {

    mixins: [helpers],

    data() {
        return {
            search: '',
            lista_productos: [],
            item_factura: [],
            mostrar_prod: [],
            select: false,
            cliente: null,
            factura: null,
            abecedario: [],
            nuevo_prod: [],
        }
    },
    created() {
        this.lista_productos = [
            {
                precio: 81921,
                codigo: 55342,
                nombre: 'MT 09',
                imagen: 'm1.jpg',
                inventario: '42'
            },
            {
                precio: 16256,
                codigo: 31245,
                nombre: 'R1 1000',
                imagen: 'm2.jpg',
                inventario: '22'
            },
            {
                precio: 17235,
                codigo: 91235,
                nombre: 'XT 600',
                imagen: 'm3.jpg',
                inventario: '55'
            },
            {
                precio: 91928,
                codigo: 83947,
                nombre: 'YZ 600',
                imagen: 'm4.jpg',
                inventario: '91'
            },
            {
                precio: 76276,
                codigo: 61253,
                nombre: 'DUKE 200',
                imagen: 'm5.jpg',
                inventario: '3'
            },
            {
                precio: 81921,
                codigo: 89465,
                nombre: 'KAWASAKI Z1000',
                imagen: 'm6.jpg',
                inventario: '42'
            },
            {
                precio: 16256,
                codigo: 71253,
                nombre: 'BMW S 1000 RR',
                imagen: 'm7.jpg',
                inventario: '22'
            },
            {
                precio: 17235,
                codigo: 67125,
                nombre: 'YAMAHA R1',
                imagen: 'm8.png',
                inventario: '55'
            },
            {
                precio: 91928,
                codigo: 23451,
                nombre: 'YAMAHA U5E',
                imagen: 'm9.jpg',
                inventario: '91'
            },
            {
                precio: 76276,
                codigo: 58649,
                nombre: 'DUCATI MONSTER',
                imagen: 'm10.jpg',
                inventario: '3'
            },
        ],

        this.mostrar_prod = this.lista_productos

        this.cliente = {
            nombre: 'Manuel Stiven',
            doc: 1117930206
        }

        this.factura = {
            fecha: '',
            hora: '',
            doc_client: '',
            name_client: '',
            numero: '',
            iva: '',
            total_bruto: '',
            total: 0
        },

        this.nuevo_prod = {
            imagen: 'de.png',
            nombre: '',
            precio: '',
            inventario: '',
            codigo: '',
        }

        this.lista_productos.sort((p1, p2) => {
            if (p1.nombre > p2.nombre) {
                return 1
            }
            if (p1.nombre < p2.nombre) {
                return -1
            }
        })

        let colores = this.normalColors()
        let letra = ''

        this.lista_productos.forEach((prod, index) => {
            let array = prod.nombre.split("")

            if (letra != array[0]) {
                this.abecedario.push({
                    le: array[0],
                    color: colores[index]
                })
                letra = array[0]
            }
        })
    },
    methods: {

        insertar(codigo_buscar) {

            let item = this.mostrar_prod.find(pro => pro.codigo == codigo_buscar)
            let encontrado = this.item_factura.find((pro) => pro.codigo == item.codigo)
            if (encontrado == undefined) {

                item.cantidad = 1
                item.select = true
                item.subtotal = 0
                item.subtotal = item.cantidad * item.precio
      
                this.factura.total += item.subtotal
                this.factura.iva += Math.round(item.subtotal * 0.1)            
                this.factura.total_bruto += Math.round(item.subtotal * 0.9)
                this.item_factura.push(item)
            }

            var hoy = new Date();
            var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear()
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()

            this.factura.fecha = fecha
            this.factura.hora = hora
            this.factura.doc_client = this.cliente.doc
            this.factura.name_client = this.cliente.nombre
            this.factura.numero = Math.round(Math.random() * (9000000 - 1000000) + 1000000)
            

        },
        suma(codigo) {

            let item = this.item_factura.find((pro) => pro.codigo == codigo)

            if (item.cantidad < item.inventario) {

                this.factura.total -= item.subtotal

                item.cantidad++
                item.subtotal = item.cantidad * item.precio

                this.factura.total = item.subtotal
                this.factura.iva = Math.round(item.subtotal * 0.1)            
                this.factura.total_bruto = Math.round(item.subtotal * 0.9)
            }
        },
        restar(codigo) {

            let item = this.item_factura.find((pro) => pro.codigo == codigo)

            if (item.cantidad > 1) {

                this.factura.total -= item.subtotal

                item.cantidad--
                item.subtotal = item.cantidad * item.precio

                this.factura.total += item.subtotal
                this.factura.iva = Math.round(item.subtotal * 0.1)            
                this.factura.total_bruto = Math.round(item.subtotal* 0.9)
            }
        },
        encontrar(letra) {
            this.mostrar_prod = this.lista_productos.filter(
                (pro) => pro.nombre.toLowerCase().indexOf(letra.toLowerCase()) == 0
            )
        },
        filtrar() {

            this.mostrar_prod = this.lista_productos.filter(
                (pro) => (pro.nombre.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
                    (pro.codigo.toString().indexOf(this.search) > -1)
            )
        },
        eliminar(index) {

            let item = this.item_factura[index]
            this.factura.total -= item.subtotal
            this.factura.iva -= Math.round(item.subtotal * 0.1)            
            this.factura.total_bruto -= Math.round(item.subtotal* 0.9)   
            this.item_factura.splice(index, 1)
            item.select = false
            item.cantidad = ''

        },
        agregar() {
            this.mostrar_prod.push(this.nuevo_prod)
        }
    },
}

Vue.createApp(App).mount('#app')

function mostrar() {
    document.getElementById('facture').style.transform = 'translateX(0)';
}
function ocultar() {
    document.getElementById('facture').style.transform = 'translateX(40rem)';
}

function aparecer() {
    document.getElementById('fact').style.transform = 'translateX(0)';
}
function quitar() {
    document.getElementById('fact').style.transform = 'translateX(-40rem)';
}

function mostrar_modal() {
    document.getElementById('modal').style.transform = 'scale(1)';
}