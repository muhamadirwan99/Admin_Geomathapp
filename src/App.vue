<template>
  <div class="wrapper">
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
        <router-link to="/" class="simple-text logo-mini">
          <div class="logo-image">
            <img src="https://i.ibb.co/wJVhXf0/AppIcon.png" />
          </div>
        </router-link>

        <router-link to="/" class="simple-text">Admin</router-link>
      </div>
      <!-- Sidebar -->
      <SidebarComp />
    </div>
    <div class="main-panel">
      <!-- Navigation -->
      <NavComp />
      <!-- Main Content -->
      <router-view />
      <!-- Footer -->
      <FooterComp />
    </div>
  </div>
</template>

<script>
// Components
import FooterComp from "./components/FooterComp.vue";
import NavComp from "./components/NavComp.vue";
import SidebarComp from "./components/SidebarComp.vue";

export default {
  name: "App",
  components: {
    FooterComp,
    NavComp,
    SidebarComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.btn-group .btn:focus {
  background-color: #ef8157 !important;
}

.btn-primary:hover {
  color: #212529;
  background-color: #52bebe;
  border-color: #8ad3d3;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff; /*set the color you want here*/
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.btn-primary:active:focus,
.btn-primary:active:hover,
.btn-primary.active:focus,
.btn-primary.active:hover,
.show > .btn-primary.dropdown-toggle,
.show > .btn-primary.dropdown-toggle:focus,
.show > .btn-primary.dropdown-toggle:hover {
  background-color: #0069d9 !important;
  color: #ffffff !important;
  box-shadow: none !important;
}
</style>
