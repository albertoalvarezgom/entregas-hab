<template>
  <div>
    <vue-headful title="Añadir cliente" description="Página para añadir un cliente" />
    <headercustom></headercustom>
    <menucustom></menucustom>
    <!-- PÁRRAFO DE AVISO -->
    <p v-show="required" class="aviso">Todos los campos de este formulario son obligatorios : /</p>
    <!-- /PÁRRAFO DE AVISO -->
    <!-- FORMULARIO -->
    <div>
      <form>
        <fieldset>
          <label for="nombre">
            <h3>Nombre:</h3>
          </label>
          <input type="text" name="nombre" placeholder="Escribe tu nombre" v-model="nombre" />
        </fieldset>

        <fieldset>
          <label for="apellido">
            <h3>Apellido:</h3>
          </label>
          <input type="text" name="apellido" placeholder="Escribe tu apellido" v-model="apellido" />
        </fieldset>

        <fieldset>
          <label for="ciudad">
            <h3>Ciudad:</h3>
          </label>
          <input type="text" name="ciudad" placeholder="Escribe tu ciudad" v-model="ciudad" />
        </fieldset>

        <fieldset>
          <label for="empresa">
            <h3>Empresa:</h3>
          </label>
          <input type="text" name="empresa" placeholder="Escribe tu empresa" v-model="empresa" />
        </fieldset>
      </form>
      <button @click="addClient(nombre, apellido, ciudad, empresa)">Crear cliente</button>
      <!-- /FORMULARIO -->
    </div>
    <footercustom></footercustom>
  </div>
</template>

<script>
import axios from "axios";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import headercustom from "@/components/HeaderCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "AddClient",
  components: { menucustom, footercustom, headercustom },
  data() {
    return {
      nombre: "",
      apellido: "",
      ciudad: "",
      empresa: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    //Función para comprobar que los inputs no van vacíos
    validatingData() {
      //Si algún campo va vacío...
      if (
        this.nombre === "" ||
        this.apellido === "" ||
        this.ciudad === "" ||
        this.empresa === ""
      ) {
        this.correctData = false; //...datos incorrectos
        this.required = true; // y campos requeridos faltan
      } else {
        //Si están todos llenos...
        this.correctData = true; //...datos correctos
        this.required = false; // y ningún campo falta
      }
    },
    addClient(nombre, apellido, ciudad, empresa) {
      //Validamos los datos con la función anterior
      this.validatingData();
      //Si los datos son correctos...
      if (this.correctData === true) {
        let self = this;
        //...hacemos la petición post y mandamos los datos
        axios
          .post("http://localhost:3050/add-client", {
            nombre: self.nombre,
            apellido: self.apellido,
            ciudad: self.ciudad,
            empresa: self.empresa
          })
          //y a continuación vaciamos los inputs
          .then(function(response) {
            self.emptyFields();
            //Lanzamos cuadro de diálogo de éxito :)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Cliente añadido correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          })
          //y miramos si hay algún error
          .catch(function(error) {
            console.error(error);
          });
        //Si funciona nos vamos a la página de productos
        this.$router.push("/clientes");
      }
      //Si los datos no son correctos lanzamos un alert
      else {
        //Lanzamos cuadro de diálogo de que algo falló :(
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo falló añadiendo el cliente...",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    //Función para resetear y vaciar los campos del formulario
    emptyFields() {
      this.nombre = "";
      this.apellido = "";
      this.ciudad = "";
      this.empresa = "";
    }
  }
};
</script>

<style>
.aviso {
  color: red;
}

form {
  margin: 1rem;
}

fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

fieldset label {
  margin-bottom: 1rem;
}

fieldset input {
  margin: 0 auto;
  border: none;
  border-bottom: 2px solid #203b8c;
  text-align: center;
  width: 300px;
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
</style>
