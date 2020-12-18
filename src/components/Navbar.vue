<template>
  <main>
    <nav class="flex justify-between items-center px-5 bg-gray-100 py-2">
      <section class="flex justify-center items-center">
          <span class="bg-blue-500 rounded-full w-12 h-12"></span>
          <h1 class="text-xl text-blue-400 ml-3">Awwal Shop</h1>
      </section>
      <section class="flex justify-center items-center">
        <i class="fas fa-bars  fa-2x text-blue-500 cursor-pointer" @click="show = !show"></i>
      </section>
    </nav>
    <aside class=" absolute right-0 top-0 w-1/3 h-full bg-gray-500" v-if="show">
      <i class="fas fa-times fa-2x text-blue-400 cursor-pointer" @click="show = !show"></i>
      <!-- links -->
      <div class="w-full flex-col-center text-gray-200 text-lg font-bold">
        <router-link to="/login" class="link-effects" v-if="!isLoggedIn">login</router-link>
        <router-link to="/register" class="link-effects" v-if="!isLoggedIn">Register</router-link>
        <router-link to="/add-product" class="link-effects" v-if="isLoggedIn">add product</router-link>
        <router-link to="/view-products" class="link-effects" v-if="isLoggedIn">view products</router-link>
        <router-link to="/view-public" class="link-effects" >view products (public)</router-link>
        <p class="link-effects cursor-pointer addborder px-3 py-1 bg-gray-300 text-gray-800" v-if="isLoggedIn" @click="logout">logout</p>
      </div>
      <!-- !links end -->

    </aside>
  </main>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  },
  methods:{
    async logout(){
      await auth.signOut();
      //removing the uid from localstorage
      localStorage.removeItem("UID");
      //redirecting user to login page
      this.$router.push("/login");
    }
  },
  computed:{
    isLoggedIn(){
      return auth.currentUser;
    }
  }
}
</script>

<style>

</style>