<template>
  <main>
      <Navbar/>
      <div id="login-form" class="flex flex-col items-center">
          <h1 class="text-blue-400 text-xl font-bold mb-5">Item List</h1>
          <div class="flex flex-col justify-center w-full items-center">
              <section class="flex justify-between w-full bg-gray-100 p-1 items-center px-2" v-for="(item,index) in items" :key="index">
                  <p v-html="(item.name.length > 10) ? item.name : (item.name+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')"></p>
                  <p>MVR {{item.price}}</p>
                  <input type="text" disabled class="log_input w-10 rounded-lg" :value="item.quantity">
                  <button class="text-red-500" @click="edit(item)">EDIT</button>
              </section>
          </div>
      </div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar';
export default {
    components:{Navbar},
    data(){
        return{
            items:[]
        }
    },
    methods:{
        edit(item){
            //commiting a mutation for adding the selected item to our store
            this.$store.commit('setItem',item);
            this.$router.push('/add-product');
        }
    },
    async mounted(){
        //getting all of the items from our collection
        let res = await db.collection('products').get();
        res.docs.forEach(doc => {
            //pushing each document and its id to items array
            this.items.push({...doc.data(),id:doc.id});
        });
    }
}
</script>

<style>

</style>