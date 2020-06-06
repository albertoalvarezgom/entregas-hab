<template>
  <div>
    <!-- FORMULARIO -->
    <form>
      <input type="text" placeholder="Tu nombre" name="name" />
      <br />
      <input type="text" placeholder="Asunto" name="name" />
      <br />
      <textarea
        name="textarea"
        id="textarea"
        cols="50"
        rows="4"
        placeholder="Escribe aquí tu mensaje..."
      ></textarea>

      <!-- BOTONES -->
      <br />
      <button @click="eventCancel">Cancelar</button>
      <button @click="eventSend">Enviar</button>
    </form>
    <!-- /FORMULARIO -->
  </div>
</template>

<script>
export default {
  name: "FormCustom",
  methods: {
    eventSend() {
      this.$emit("send");
    },
    eventCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid #42b983;
  padding: 0.5rem 1rem;
  margin-bottom: 3rem;
}

textarea {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid #42b983;
  padding: 0.5rem 1rem;
}

button {
  border-radius: 30px;
  border: 2px solid #42b983;
  background-color: rgba(255, 255, 255, 0);
  padding: 0.5rem 1.5rem;
  color: #42b983;
  font-weight: 700;
  margin: 1rem;
}

button:hover {
  background-color: #42b983;
  color: white;
}
</style>
