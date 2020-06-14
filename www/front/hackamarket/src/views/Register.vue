<template>
  <div>
    <vue-headful title="Registro" description="Página de registro" />
    <!-- <menucustom></menucustom> -->
    <!-- PÁRRAFO DE AVISO -->
    <p v-show="required">Todos los campos de este formulario son obligatorios : /</p>
    <!-- /PÁRRAFO DE AVISO -->
    <!-- FORMULARIO -->
    <div class="login">
      <h2>¡Vamos, regístrate!</h2>
      <form>
        <fieldset>
          <label for="email">Email:</label>
          <input type="email" name="email" placeholder="Escribe tu email" v-model="email" />
        </fieldset>
        <fieldset>
          <label for="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            v-model="password"
          />
        </fieldset>
      </form>
      <button @click="addClient(email, password)">Enviar</button>
      <!-- /FORMULARIO -->
      <h4>¿Ya estás registrado?</h4>
      <button>
        <router-link :to="{ name: 'Login' }">¡Haz login!</router-link>
      </button>
      <br />
      <br />
      <button>
        <router-link :to="{ name: 'Productos' }">Volver a la página</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import menucustom from "@/components/MenuCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Register",
  // components: { menucustom },
  data() {
    return {
      email: "",
      password: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    //Función para comprobar que los inputs no van vacíos
    validatingData() {
      //Si algún campo va vacío...
      if (this.email === "" || this.password === "") {
        this.correctData = false; //...datos incorrectos
        this.required = true; // y campos requeridos faltan
      } else {
        //Si están todos llenos...
        this.correctData = true; //...datos correctos
        this.required = false; // y ningún campo falta
      }
    },
    addClient(email, password) {
      //Validamos los datos con la función anterior
      this.validatingData();
      //Si los datos son correctos...
      if (this.correctData === true) {
        var self = this;
        //...hacemos la petición post y mandamos los datos
        axios
          .post("http://localhost:3050/register", {
            email: self.email,
            password: self.password
          })
          //y a continuación vaciamos los inputs
          .then(function(response) {
            self.emptyFields();
          })
          //y miramos si hay algún error
          .catch(function(error) {
            console.error(error);
          });
        //Lanzamos cuadro de diálogo de éxito :)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario registrado con éxito :)",
          showConfirmButton: false,
          timer: 1500
        });
        this.$router.push("/login");
      }
      //Si los datos no son correctos lanzamos un alert
      else {
        //Lanzamos cuadro de diálogo de éxito :)
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo falló en el registro :(",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    //Función para resetear y vaciar los campos del formulario
    emptyFields() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style scoped>
p {
  color: #d9048e;
}

.login {
  margin-top: 6rem;
}

fieldset {
  border: none;
  margin: 3rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 1rem;
}

input {
  border: none;
  border-bottom: 2px solid #203b8c;
  text-align: center;
  margin: 0 auto;
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

button a {
  color: black;
}

button:hover {
  background-color: #203b8c;
  color: white;
}

button:hover a {
  color: white;
}
</style>
