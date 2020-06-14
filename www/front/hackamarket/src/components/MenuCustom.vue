<template>
  <div>
    <div id="nav">
      <router-link :to="{ name: 'Clientes' }" v-show="checkLogin()">Clientes</router-link>
      <router-link :to="{ name: 'AddClient' }" v-show="checkIsAdmin()">Añadir cliente</router-link>
      <router-link :to="{ name: 'Productos' }">Productos</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Login' }" v-show="!checkLogin()">Login</router-link>
      <router-link :to="{ name: 'Register' }" v-show="!checkLogin()">Registro</router-link>
      <div id="user">
        <p v-show="checkLogin()">Hola,{{ name }}</p>
        <button @click="logoutUser()" v-show="checkLogin()" id="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { clearLogin, isLoggedIn, checkAdmin, getUserName } from "../api/utils";

export default {
  name: "MenuCustom",
  data() {
    return {
      name: ` ${getUserName()}`
    };
  },
  methods: {
    logoutUser() {
      this.$router.push("/productos");
      this.$router.go();
      return clearLogin();
    },
    checkLogin() {
      return isLoggedIn();
    },
    checkIsAdmin() {
      return checkAdmin();
    }
  }
};
</script>

<style>
#nav {
  background-color: #4eb4bf;
}

#nav a {
  font-weight: bold;
  color: white;
  margin: 1rem;
}

#nav a:hover {
  color: #d9048e;
}

#nav a.router-link-exact-active {
  color: #203b8c;
}

#user {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

#user p {
  color: white;
  font-size: 0.8rem;
  margin: 0 1rem;
  padding: 0;
}

#logout {
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border-radius: 30px;
  padding: 0rem 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
}

#logout:hover {
  background-color: white;
  color: #4eb4bf;
}
</style>
