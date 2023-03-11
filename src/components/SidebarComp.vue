<template>
  <div class="sidebar-wrapper">
    <ul class="nav" id="nav">
      <li>
        <router-link to="/">
          <i class="nc-icon nc-bank"></i>
          <p>Home</p>
        </router-link>
      </li>
      <li>
        <router-link to="/video">
          <i class="nc-icon nc-button-play"></i>
          <p>Video</p>
        </router-link>
      </li>
      <li>
        <router-link to="/webinar">
          <i class="nc-icon nc-single-02"></i>
          <p>User</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#nav a.router-link-exact-active {
  color: #120D29;
  opacity: 1;
}
</style>
