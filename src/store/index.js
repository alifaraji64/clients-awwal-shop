import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableItem:{
      category:'',
      name:'',
      price:'',
      quantity:'',
      docId:''
    }
  },
  mutations: {
    setItem(state,item){
      state.editableItem.category = item.category;
      state.editableItem.name = item.name;
      state.editableItem.price = item.price;
      state.editableItem.quantity = item.quantity;
      state.editableItem.docId = item.id;
    }
  },
  actions: {
  },
  modules: {
  }
})
