<template>
  <nav
    id="sidebar"
    :class="{
      active: isOpenSideBar,
    }"
  >
    <div class="sidebar-header">
      <h3>
        <router-link to="/" class="">
          <img src="@/assets/logo.svg" alt="logo" class="img-fluid" /> Alegra
          Restaurant
        </router-link>
      </h3>
    </div>

    <ul class="list-unstyled components">
      <li
        v-for="(item, index) in menu"
        :key="index"
        :class="{
          active: path == item.path,
        }"
      >
        <template v-if="item.isActive && !item.hiddenInTheSidebar">
          <router-link :to="item.path" class="" active-class="active">{{
            item.text
          }}</router-link>
          <hr class="dropdown-divider" v-if="item.divider" />
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

import useConfig from "@/composables/useConfig";
import useAuth from "@/composables/useAuth";

export default {
  name: "SideBarCustom",
  setup(props, ctx) {

    const {
        auth,
        signOut,
    } = useAuth();
    
    const route = useRoute();

    const path = computed(() => route.path);

    const {
      getMenuItems: menu,
      isOpenSideBarChange,
      isOpenNavBarChange,
      isOpenSideBar,
      isOpenNavBar,
    } = useConfig();

    return {
      menu,
      path,
      isOpenSideBarChange,
      isOpenNavBarChange,
      isOpenSideBar,
      isOpenNavBar,
      auth,
    };
  },
};
</script>

<style scoped>
#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
}

#sidebar.active {
  margin-left: -250px;
}

a[data-toggle="collapse"] {
  position: relative;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
  /* border-bottom: 1px solid #47748b; */
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}
</style>
