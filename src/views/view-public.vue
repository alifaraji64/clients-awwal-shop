<template>
  <main>
      <Navbar/>
      <div id="login-form" class="flex flex-col items-center">
          <br>
          <div class="flex flex-col justify-center w-full items-center">
              <!-- items -->
              <section class="flex justify-between w-full bg-gray-100 p-1 items-center px-2" v-for="(item,index) in items" :key="index">
                  <p v-html="(item.name.length > 10) ? item.name : (item.name+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')">
                  </p>
                  <p>MVR {{item.price}}</p>
                  <input type="number" name="points" step="1" max="100" min="0" class="log_input w-10 rounded-lg" value="0">
                  <button class="text-red-500">EDIT</button>
              </section>
             <!-- !items end  -->

             <!-- purchase details -->
              <div class="flex justify-end flex-col items-end w-full">
                  <p class="text-blue-400">29 items selected</p>
                  <h3 class="underline text-lg">Total MVR <span>387.00</span></h3>
              </div>
              <!-- purchase details end -->

              <!-- form  -->
              <section class="flex-col-center">
                  <div id="text" class="flex-col-center">
                    <h2 class="text-blue-400 font-semibold">Transfer to complete purchase</h2>
                    <p class="text-gray-400">Transfer and upload the slip</p>
                  </div>
                  <form>
                      <!-- putting each input inside a div for attaching an icon for each input -->
                      <div class="log_input flex justify-between items-center">
                          <input type="email" placeholder="email" class="bg-transparent" required>
                          <i class="far fa-envelope fa-2x"></i>
                      </div>
                      <div class="log_input flex justify-between items-center">
                          <input type="number" placeholder="7777754543" class="bg-transparent" required>
                          <i class="far fa-copy fa-2x"></i>
                      </div>
                      <div class="log_input flex justify-between items-center">
                          <input type="file" placeholder="UPLOAD SLIP" class="bg-transparent" required>
                          <i class="fas fa-file-upload fa-2x"></i>
                      </div>
                      <!-- making the last input and button in the same row -->
                      <section class="flex justify-between">
                            <div class="log_input flex justify-between items-center">
                                <input type="tel" placeholder="phone number" class="bg-transparent" required>
                            </div>
                            <button class="bg-blue-400 text-gray-100 px-1 py-1 rounded-xl">Submit</button>
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
export default {
    components:{Navbar},
    data(){
        return{
            items:[
                {name:'milo tin 200ml', price:"12.00"},
                {name:'latte tin 200ml', price:"12.00"},
                {name:'Orange', price:"4.00"},
                {name:'Apple', price:"3.00"},
            ]
        }
    }
}
</script>

<style>

</style>