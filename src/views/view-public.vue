<template>
  <main>
      <Navbar/>
      <div class="bg-gray-200 flex justify-between items-center py-1">
            <h3>Category: <span>{{search}}</span></h3>
            <input type="text"  placeholder="search by category" class="bg-gray-200 w-30 mr-2" v-model="search">
      </div>
      <div id="login-form" class="flex flex-col items-center">
          <br>
          <div class="flex flex-col justify-center w-full items-center">
              <!-- items -->
            <table class="table-auto w-3/4">
                <thead class="mb-4">
                    <tr>
                    <th>category</th>
                    <th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in filteredItems" :key="index" class=" text-center" :class="index%2==0 ? 'bg-gray-300':''">
                        <td>{{item.category}}</td>
                        <td>{{item.name}}</td>
                        <td>MVR {{item.price}}</td>
                        <td>MVR <input type="number" step='1' value="0" class="w-8" :max="item.quantity" min="0" @change="updateTotal(item.price,index,item.name)" :ref="index" ></td>
                    </tr>
                </tbody>
            </table>
             <!-- !items end  -->

             <!-- purchase details -->
              <div class="flex justify-end flex-col items-end w-full mr-5">
                  <p class="text-blue-400">{{totalQty}} items selected</p>
                  <h3 class="underline text-lg">Total MVR <span>{{sum}}</span></h3>
              </div>
              <!-- purchase details end -->

              <!-- form  -->
              <section class="flex-col-center">
                  <div id="text" class="flex-col-center">
                    <h2 id="success_msg" class="text-green-400 text-lg bg-yellow-100 font-bold" v-if="isDone">email has been sent to admin successfully</h2>
                    <h2 class="text-blue-400 font-semibold">Transfer to complete purchase</h2>
                    <p class="text-gray-400">Transfer and upload the slip</p>
                  </div>
                  <form @submit.prevent='submitForm'>
                      <!-- putting each input inside a div for attaching an icon for each input -->
                      <div class="log_input flex justify-between items-center">
                          <input type="email" placeholder="email" class="bg-transparent" required v-model="email">
                          <i class="far fa-envelope fa-2x"></i>
                      </div>
                      <div class="log_input flex justify-between items-center">
                          <input type="text" placeholder="7777754543" class="bg-transparent" required v-model="cardNumber">
                          <i class="far fa-copy fa-2x"></i>
                      </div>
                      <div class="log_input flex justify-between items-center">
                          <input type="file" placeholder="UPLOAD SLIP" class="bg-transparent" required @change="inputChange">
                          <i class="fas fa-file-upload fa-2x"></i>
                      </div>
                      <!-- making the last input and button in the same row -->
                      <section class="flex justify-between">
                            <div class="log_input flex justify-between items-center">
                                <input type="tel" placeholder="phone number" class="bg-transparent" required v-model="phoneNumber">
                            </div>
                            <button type="submit" class="bg-blue-400 text-gray-100 px-1 py-1 rounded-xl hover:bg-blue-500" >Submit</button>
                      </section>

                  </form>
              </section>
              <!-- !form end  -->
          </div>
      </div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar';
import emailjs from 'emailjs-com';
export default {
    components:{Navbar},
    data(){
        return{
            items:[],
            search:'',
            purchasedItems:[],
            sum:0,
            totalQty:0,
            file:'',
            url:'',
            email:'',
            cardNumber:'',
            phoneNumber:'',
            isDone:true,
        }
    },
    methods:{
        updateTotal(price,index,name){
            //getting the value of each input with the uniqe index
            let value = this.$refs[index][0].valueAsNumber;
            let sum = value*price;
            //checking if the name of the item that we are tring to push is alredy in the array we just removing it and adding the new one. this prevents duplication
            if (this.purchasedItems.some(e => e.name === name)) {
                this.purchasedItems.forEach((item,index)=>{
                    if(item.name == name){
                        this.purchasedItems.splice(index,1)
                    }
                })
            }
            this.purchasedItems.push({name,sum,qty:sum/price});
            //get the totla sum by adding all of the sums in purchasedItems array
            this.purchasedItems.forEach((item,i)=>{

                if(i == 0){ this.sum = item.sum;this.totalQty = item.qty;}
                else{
                  this.sum += item.sum;
                  this.totalQty += item.qty;
                }

            })
            console.log(this.purchasedItems);
        },
        //recieving the file(image) from input and saving it inside this.file
        inputChange(e){
            let file = e.target.files[0];
            this.file = file;
            console.log(this.file);
        },
        async submitForm(){
            this.isDone = false;
            //create a storage ref
            let storageRef = await storage.ref(`photos/${this.file.name}`);
            //upload the file to storage ref
            let task = storageRef.put(this.file);
            task.on(
            "state_changed",
             function progress()
            {
                console.log("in progress");
            },

             function error(err)
             {
                console.log(err);
            },
            //this function will fire when the file has been uploaded successfully
            async()=>{
                try
                {
                    //get the url of uploaded image
                    let url = await task.snapshot.ref.getDownloadURL();
                    this.url = url;
                    console.log(url);
                    try
                    {
                        //sending email
                        await emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
                            from_name: this.email,
                            to_name: "admin",
                            message: `you can check the slip URL by clicking the link ${this.url} ----cardNumber:${this.cardNumber}----phoneNumber:${this.phoneNumber}`,
                        });
                        //showing the success message
                        this.isDone = true;
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                }
                catch(e)
                {
                    console.log(e);
                }
            }
        )


    }},
    computed:{
        filteredItems(){
            return this.items.filter((item)=>item.category.includes(this.search))
        }
    },
    async mounted(){
        emailjs.init("YOUR_USER_ID");
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