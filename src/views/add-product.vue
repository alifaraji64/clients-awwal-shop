<template>
  <main>
      <Navbar/>
      <div id="login-form" class="flex flex-col items-center">
          <h1 class="text-blue-400 text-xl font-bold mb-5"><span>{{editing == true ?'update':'add new'}}</span> Product</h1>
          <!-- success message -->
          <h2 class="text-green-600 text-md bg-blue-100 px-2 py-1" v-if="showSuccessMsg">your item <span>{{editing == true ?'updated':'added'}}</span> successfully</h2>
          <!-- !success message end-->
          <form class="flex flex-col items-start">
              <input type="text" placeholder="Category" class="log_input" required v-model="category">
              <input type="text" placeholder="Name" class="log_input" required v-model="name">
              <input type="text" placeholder="MVR" class="log_input" required v-model="price">
              <input type="text" placeholder="QTY" class="log_input" required v-model="quantity">
              <button class="text-gray-100 bg-blue-500 rounded-2xl py-1 px-3" @click.prevent="addProduct" v-if="!editing">Submit</button>
              <button class="text-gray-100 bg-blue-500 rounded-2xl py-1 px-3" @click.prevent="editProduct" v-if="editing">Update</button>
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
            category:"",
            name:"",
            price:"",
            quantity:"",
            showSuccessMsg:false,
            //this editing variable the state of the add-product page if it is true it means we are editing if it is false it means we are adding new items
            editing:false,
            docId:''
        }
    },
    methods:{
        async addProduct(){
            this.showSuccessMsg = false;
            try
            {
                await db.collection('products').add({
                // add new items to products collection
                // also converting the price and qty to numbers
                uid:localStorage.getItem('UID'),
                category: this.category,
                name: this.name,
                price: parseInt(this.price),
                quantity: parseInt(this.quantity)
            })
            //showing success message after adding items successfully
            this.showSuccessMsg = true;
            //reset the inputs
            this.category = '';
            this.name = '';
            this.price = '';
            this.quantity = '';
            }


            catch(e)
            {
                console.log(e);
            }
        },
        async editProduct(){
            await db.collection('products').doc(this.docId).update({
                uid:localStorage.getItem('UID'),
                category: this.category,
                name: this.name,
                price: parseInt(this.price),
                quantity: parseInt(this.quantity)
            })
            this.showSuccessMsg = true;
        }
    },
    mounted(){
        if(this.$store.state.editableItem.category)
        {
            this.editing = true;
            //this means we have something in store so we should update the v-models and show them to the user so he can edit
            let obj = this.$store.state.editableItem;
            this.category = obj.category;
            this.name = obj.name;
            this.price = obj.price;
            this.quantity = obj.quantity;
            this.docId = obj.docId;
        }
        else
        {
            this.editing = false;
        }
    }
}
</script>

<style>

</style>