import{ createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const app = createApp({
    data(){
        return{
          url: 'https://vue3-course-api.hexschool.io/v2',
          path:'fengchiliu',
          // 建立一個空陣列來存商品的資料
          products:[],
          // 建立一個空物件來暫存被選中商品的資料
          tempProduct: {},
        }
    },
    methods:{
      // 確認是否登入成功
      check(){
        axios.post(`${this.url}/api/user/check`)
          .then((res) =>{
            // 登入成功後驗證是否為後台使用者
            this.getData();
          })
          .catch((err) =>{
            window.location = 'login.html';
          })
      },
      // 如果為後台者，即可讀取後台資料
      getData(){
        axios.get(`${this.url}/api/${this.path}/admin/products`)
          .then(res=>{
            this.products = res.data.products;
          })
          .catch(err=>{
            alert(err.data.message);
          })
      },
      openProduct(item){
        // 將點擊的資訊加入暫存的物件中
        this.tempProduct = item;
      }
    },
    // 一開始先做事項
    mounted(){
      // 先取出 token 
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      // 先做確認動作，確認是否為登入狀態
      this.check();
    }
});
app.mount('#app');
