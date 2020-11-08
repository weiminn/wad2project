import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Bookings.vue";
import Task from "../views/Task.vue";
import Schedule from "../views/Schedule.vue";
import BookingForm from "../views/BookingForm.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking
  },
  {
    path: "/tasks",
    name: "Task",
    component: Task
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule
  },
{ 
    path: "/bookingForm",
    name: "BookingForm",
    component: BookingForm,
    props: true
  },
  { 
    path: "/login",
    name: "Login",
    component: Login,
    props: true
  },
  { 
    path: "/logout",
    name: "Logout",
    component: Logout,
    props: true
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
