<template>
  <div>
    <div class="login">
      <vue-headful title="Login" description="Página de login" />
      <h2>¡Haz Login, caramba!</h2>
      <form>
        <fieldset>
          <input type="email" placeholder="Email" v-model="email" />
          <input type="password" placeholder="Contraseña" v-model="password" />
          <button @click="login()">Login</button>
        </fieldset>
      </form>
      <p>¿Todavía no estás registrado?</p>
      <button>
        <router-link :to="{ name: 'Register' }">¡Regístrate ahora!</router-link>
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
import { loginUser } from "../api/utils";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        //Intentamos hacer login
        await loginUser(this.email, this.password, this.admin);
        //Lanzamos cuadro de diálogo de éxito :)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login correcto. ¡Bienvenido/a!",
          showConfirmButton: false,
          timer: 1500
        });
        //Si funciona nos vamos a la página de productos
        this.$router.push("/productos");
      } catch (error) {
        alert(`Error: ${error}`);
      }
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 6rem;
}

fieldset {
  border: none;
  margin: 3rem;
}

input {
  border: none;
  border-bottom: 2px solid #203b8c;
  text-align: center;
  margin: 0 1rem;
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
