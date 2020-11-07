<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color:#102B72" >
      <b-navbar-brand href="#">MeetingGoWhere</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/booking">My Bookings</b-nav-item>
          <b-nav-item to="/tasks">Tasks</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a.nav-link {
  font-weight: bold;

  &.router-link-exact-active {
    color: white;
  }
}
</style>
