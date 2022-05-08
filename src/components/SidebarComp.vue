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
        <router-link to="/tips">
          <i class="nc-icon nc-bulb-63"></i>
          <p>Tips and trick</p>
        </router-link>
      </li>
      <li>
        <router-link to="/webinar">
          <i class="nc-icon nc-bullet-list-67"></i>
          <p>Webinar</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#nav a.router-link-exact-active {
  color: #00b7be;
  opacity: 1;
}
</style>
