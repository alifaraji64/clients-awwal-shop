<template>
  <main>
      <Navbar/>
      <div id="login-form" class="flex flex-col items-center">
          <h1 class="text-blue-400 text-xl font-bold mb-5">REGISTER</h1>
          <form class="flex flex-col items-start">
              <input type="email" placeholder="Email" class="log_input" v-model="email">
              <input type="password" placeholder="password" class="log_input" v-model="password">
              <button class="text-gray-100 bg-blue-500 rounded-2xl py-1 px-3" @click.prevent="register">REGISTER</button>
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
            email:'',
            password:'',
            error:''
        }
    },
    methods:{
        async register(){
            try
            {
                //register user with email and password
                let res = await auth.createUserWithEmailAndPassword(this.email,this.password);
                let uid = res.user.uid;
                this.$router.push("/add-product");
            }

            catch(e)
            {
                console.error(e.message);
            }

        }
    },
    mounted(){

    }
}
</script>

<style>

</style>