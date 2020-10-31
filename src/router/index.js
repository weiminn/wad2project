import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Task from "../views/Task.vue";
import Schedule from "../views/Schedule.vue";
import BookingForm from "../views/BookingForm.vue";

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
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
