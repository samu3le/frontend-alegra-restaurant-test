<template>
  <h1 class="fw-bold p-4 text-center">Alegra Restaurant</h1>
  <div class="container w-75 mt-5 rounded shadow">
    <div class="row align-items-stretch">
      <div
        class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"
      ></div>
      <div class="col bg-white p-5 rounded-end">
        <div class="text-end d-lg-none">
          <img src="@/assets/logo.svg" width="48" alt="" />
        </div>
        <h4 class="fw-bold text-center py-5">Inicio de Sesion</h4>

        <form action="#">
          <div class="mb-4">
            <label for="nickname" class="form">Nombre de usuario</label>
            <input type="text" class="form-control" name="nickname" />
          </div>
          <div class="mb-4">
            <label for="password" class="form">Contraseña</label>
            <input type="password" class="form-control" name="password" />
          </div>
          <div class="mb-4 form-check">
            <input
              type="checkbox"
              name="remember_me"
              class="form-check-input"
              id=""
            />
            <label for="remember_me" class="form-check-label"
              >Mantenerme conectado</label
            >
          </div>
          <div class="d-grid">
            <button class="btn btn-primary">Iniciar Sesion</button>
          </div>
          <div class="my-3">
            <span><a href="#">Registrate</a></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.container {
  background: #7386d5;
  background: linear-gradient(to right, #6d7fcc, #cdc6f0);
}
.bg {
  background-image: url("../../assets/restaurant.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  filter: brightness(-100%);
}
</style>
