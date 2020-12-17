<template>
  <main>
      <Navbar/>
      <div id="login-form" class="flex flex-col items-center">
          <h1 class="text-blue-400 text-xl font-bold mb-5">Login</h1>
          <form class="flex flex-col items-start">
              <input type="email" placeholder="Email" class="log_input" v-model="email">
              <input type="password" placeholder="password" class="log_input" v-model="password">
              <button class="text-gray-100 bg-blue-500 rounded-2xl py-1 px-3" @click.prevent="login">LOGIN</button>
          </form>
      </div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar';
export default {
    components:{Navbar},
    data(){
        return{
            email: "",
            password: "",
        }
    },
    methods:{
        async login() {
        let res = await auth
        .signInWithEmailAndPassword(this.email, this.password);
        let uid = res.user.uid;
        //extracting the firebase provided uid and store it in localstorage
        localStorage.setItem("UID", uid);
        this.$router.push("/add-product");
    },
    }
}
</script>

<style>

</style>