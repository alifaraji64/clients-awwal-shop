<template>
  <main>
      <Navbar/>
      <div class="bg-gray-200 flex justify-between items-center py-1">
        <h3>Category: <span>{{search}}</span></h3>
        <input type="text"  placeholder="search by category" class="bg-gray-200 w-30 mr-2" v-model="search">
      </div>
      <div id="login-form" class="flex flex-col items-center">
          <h1 class="text-blue-400 text-xl font-bold mb-5">Item List</h1>
            <table class="table-auto w-3/4">
            <thead class="mb-4">
                <tr>
                <th>category</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in filteredItems" :key="index" class=" text-center" :class="index%2==0 ? 'bg-gray-300':''">
                    <td>{{item.category}}</td>
                    <td>{{item.name}}</td>
                    <td>MVR {{item.price}}</td>
                    <td>MVR {{item.quantity}}</td>
                    <td><button class="text-red-500" @click="edit(item)">EDIT</button></td>
                </tr>
            </tbody>
            </table>
      </div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar';
export default {
    components:{Navbar},
    data(){
        return{
            items:[],
            search:'',
        }
    },
    methods:{
        edit(item){
            //commiting a mutation for adding the selected item to our store
            this.$store.commit('setItem',item);
            this.$router.push('/add-product');
        },
    },
    computed:{
        filteredItems(){
            return this.items.filter((item)=>item.category.includes(this.search))
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
table{
      border-collapse:separate;
      border-spacing: 0 1em;
}
</style>