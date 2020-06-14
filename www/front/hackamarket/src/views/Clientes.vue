<template>
  <div>
    <vue-headful title="Clientes" description="Página de clientes" />
    <headercustom></headercustom>
    <menucustom></menucustom>
    <h2>CLIENTES</h2>
    <!-- AVISO DE QUE NO HAY CLIENTES-->
    <h3 v-show="empty">En este momento no hay clientes :(</h3>
    <!-- BÚSQUEDA DE CLIENTE POR NOMBRE -->

    <input
      v-model="search"
      id="search"
      type="search"
      placeholder="Nombre del cliente"
      name="bySearch"
    />
    <!-- /BÚSQUEDA DE CLIENTE POR NOMBRE -->
    <!-- LOADING -->
    <loadingcustom v-if="clientes.length===0"></loadingcustom>
    <!-- /LOADING -->
    <!-- LISTA DE CLIENTES -->
    <div
      class="clientes"
      v-for="(cliente, index) in filteredClients"
      :key="cliente.id"
      v-show="!empty"
    >
      <div class="cliente">
        <h1>{{ cliente.nombre }} {{ cliente.apellido }}</h1>
        <i>id: {{ cliente.id }}</i>
        <h2>{{ cliente.ciudad }}</h2>
        <h3>{{ cliente.empresa }}</h3>
        <button @click="deleteClients(index)">Eliminar cliente</button>
        <button @click="openModal()">Editar cliente</button>
      </div>

      <!-- MODAL PARA EDITAR CLIENTE -->
      <div class="modal" v-show="modal">
        <div class="modalBox">
          <p
            v-show="required"
            class="aviso"
          >Todos los campos de este formulario son obligatorios : /</p>
          <h2>Edita la información del cliente</h2>
          <input type="text" placeholder="Nombre" v-model="nuevoNombre" />
          <br />
          <input type="text" placeholder="Apellido" v-model="nuevoApellido" />
          <br />
          <input type="text" placeholder="Ciudad" v-model="nuevoCiudad" />
          <br />
          <input type="text" placeholder="Empresa" v-model="nuevoEmpresa" />
          <br />
          <div class="buttons">
            <button @click="closeModal()">Cancelar</button>
            <button @click="updateClients(index)">Aceptar</button>
          </div>
        </div>
      </div>
      <!-- /MODAL PARA EDITAR CLIENTE -->
    </div>
    <!-- /LISTA DE CLIENTES -->
    <footercustom></footercustom>
  </div>
</template>

<script>
import axios from "axios";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import loadingcustom from "@/components/LoadingCustom.vue";
import headercustom from "@/components/HeaderCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Clientes",
  components: { menucustom, footercustom, loadingcustom, headercustom },
  data() {
    return {
      clientes: [],
      nuevoNombre: "",
      nuevoApellido: "",
      nuevoCiudad: "",
      nuevoEmpresa: "",
      modal: false,
      required: false,
      correctData: false,
      empty: false,
      search: ""
    };
  },
  computed: {
    filteredClients() {
      if (!this.search) {
        return this.clientes;
      } else {
        return this.clientes.filter(cliente =>
          cliente.nombre.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    }
  },
  methods: {
    //Función para comprobar si hay clientes
    existingClients() {
      if (!this.clientes[0].id) {
        this.empty = true;
      } else {
        this.empty = false;
      }
    },
    //Función para comprobar que los inputs no van vacíos
    validatingData() {
      //Si algún campo va vacío...
      if (
        this.nuevoNombre === "" ||
        this.nuevoApellido === "" ||
        this.nuevoCiudad === "" ||
        this.nuevoEmpresa === ""
      ) {
        this.correctData = false; //...datos incorrectos
        this.required = true; // y campos requeridos faltan
      } else {
        //Si están todos llenos...
        this.correctData = true; //...datos correctos
        this.required = false; // y ningún campo falta
      }
    },
    //Función para obtener la lista de clientes
    getClients() {
      let self = this;
      axios
        .get("http://localhost:3050/clientes")
        .then(function(response) {
          self.clientes = response.data;
          //Comprobamos si hay clientes en el array
          self.existingClients();
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    //Función para eliminar un cliente concreto
    deleteClients(index) {
      this.id = this.clientes[index].id;
      axios
        .delete("http://localhost:3050/clientes/delete/" + this.id)
        .then(function(response) {
          //Lanzamos cuadro de diálogo de éxito :)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente eliminado con éxito :)",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(function(error) {
          console.error(error);
          //Lanzamos cuadro de diálogo de éxito :)
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salió mal eliminado este cliente :(",
            showConfirmButton: false,
            timer: 1500
          });
        });
      //Actualizamos la página
      this.$router.go();
    },
    //Función para actualizar la info de un cliente concreto
    updateClients(index) {
      //Validamos los datos con la función anterior
      this.validatingData();
      //Si los datos son correctos...
      if (this.correctData === true) {
        let self = this;
        //Guardamos el id del cliente del índice del array de clientes
        self.id = self.clientes[index].id;
        axios
          .put("http://localhost:3050/clientes/update/" + self.id, {
            id: self.id,
            nombre: self.nuevoNombre,
            apellido: self.nuevoApellido,
            ciudad: self.nuevoCiudad,
            empresa: self.nuevoEmpresa
          })
          .then(self.closeModal())
          .catch(function(error) {
            console.error(error);
          });
        //Lanzamos cuadro de diálogo de éxito :)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente actualizado con éxito :)",
          showConfirmButton: false,
          timer: 1500
        });
        this.$router.go();
      } //Si los datos no son correctos lanzamos un alert
      else {
        //Lanzamos cuadro de diálogo de éxito :)
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Debes rellenar todos los campos del formulario :(",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    }
  },
  created() {
    this.getClients();
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.modalBox .aviso {
  color: #d9048e;
}

input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: none;
  border-bottom: 2px solid #203b8c;
  text-align: center;
  margin: 0 1rem;
  margin-bottom: 1rem;
}

button {
  border-radius: 20px;
  border: 2px solid #203b8c;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0 1rem;
  margin: 0 0.4rem;
  max-width: 200px;
  background-color: white;
}

button:hover {
  background-color: #203b8c;
  color: white;
}

.buttons {
  margin-top: 1rem;
}

.cliente {
  margin-bottom: 4rem;
}

.cliente h1 {
  margin-bottom: 0;
}

.cliente h2 {
  margin: 0.5rem;
}

.cliente h3 {
  margin: 0;
  margin-bottom: 1rem;
}
</style>
