<template>
  <div>
    <b-navbar v-show="this.$router.currentRoute.path != '/login' && this.$router.currentRoute.path != '/logout'"  type="dark" style="background-color:#102B72" >
      <img src="@/assets/smuIcon.png" class="mr-1" width="28px" alt=""> 
      <b-navbar-brand href="/"> MeetingGoWhere </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/booking">My Bookings</b-nav-item>
          <b-nav-item to="/tasks">Tasks <span class="text-danger text-bold"> ({{getPendingCount}})</span></b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if='navWidth > 991' class="ml-auto">
          <b-nav-item-dropdown text="Account" right>
            <b-dropdown-item to="/logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav v-else>
            <b-nav-item to="/logout">Sign Out</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      navWidth: window.innerWidth,
    }
  },
  computed:{
    getPendingCount:function(){
      return 1;
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.navWidth = window.innerWidth;
      console.log(this.navWidth);
    });
  }
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
