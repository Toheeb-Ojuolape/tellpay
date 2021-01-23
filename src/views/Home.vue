<template>
    <v-app>
    <v-main style="background:#baddf6">
      <v-container>
      <v-row no-gutters class="justify-center">
        <v-col
        cols="12"
        md="4"
        sm="12"
        
        >
        <v-card tile style="" class="elevation-24" width="400px" height="600px">
        <v-img src="@/assets/Habib.png" width="400px" height="600px" >
        </v-img>
        </v-card>
        
        
        </v-col>
         <v-col 
          cols="12"
        md="6"
        sm="12">
          <v-card tile style="padding:30px" width="500px"  height="600px" class="elevation-24">
           <p style="font-size:21px;margin-top:30px" class="font-weight-bold"> Register for this MasterClass below: </p>
            <v-form @submit="makePayment()">
            <v-select
                      v-model="country"
                      :items="currency"
                      :item-text="'country'"
                      :item-value="'code'"
                      label="Select Country"
                      @change="selectFee()"
                      color="#f5a623"
                      style="margin-top:-8px;margin-bottom:7px"
                      chips
                     ></v-select>

           <v-text-field v-model="name" color="#f5a623" outlined label="Name" />
          <v-text-field v-model="email" color="#f5a623" outlined label="Email" />
          <v-card-actions class="justify-end">
            <flutterwave
              :is-production="isProduction"
              :name="name"
              :email="email"
              :amount="fee"
              :reference="referenceFlutter"
              flw-key="FLWPUBK-d115c9fc8bbc29487ca50d90f12f7594-X"
              :callback="callbackFlutter"
              :close="close"
              :currency="country"
              :country="country.text"
              :payment_method="paymentMethod"
            />
          </v-card-actions>
          </v-form>
         <p style="text-align:center;font-size:15px" class="font-weight-bold mt-2">OR</p>
         <v-btn class="mt-2  fadein-down justify-center" block style="text-align:center" rounded large color="#24cc63" href="https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20Tell!.%20I%20would%20like%20to%20register%20for%20Sir%20Habib's%20Marketing%20class.%20My%20name%20is:"><v-icon class="white--text">mdi-whatsapp</v-icon><span class="white--text px-2" >Pay Through WhatsApp</span></v-btn>
         </v-card>
         </v-col>
      </v-row>
        

      
      
      </v-container>
    
    
    
    </v-main>
    
    </v-app>
</template>

<script>
import Flutterwave from '@/components/FlutterwaveModal.vue'


export default {
  name: "Home",
  components: {
    Flutterwave,
  },

  data: () => ({
    name:"",
    email:"",
    country: "",
    isProduction:"",
    paymentMethod:"",
    flutterwaveRef: '',
    fee:"",
    flwKey: 'FLWPUBK-d115c9fc8bbc29487ca50d90f12f7594-X',
     currency:[
               {country:'Nigeria',code:'NGN'},
               {country:'America',code:'USD'},
               {country:'Australia',code:'AUD'},
               {country:'Canada',code:'CAD'},
               {country:'Dubai',code:'AED'},
               {country:'Europe',code:'EUR'},
               {country:'England',code:'GBP'},
               {country:'Ghana',code:'GHS'},
               {country:'Kenya',code:'KES'},
               {country:'Saudi Arabia',code:'SAR'},
               {country:'South Africa',code:'ZAR'},  
                ],
  }),

 

  computed:{
    referenceFlutter() {
    let text = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  },
  },

    watch: {
    flutterwaveRef() {
      this.changesInDatabase()
    },

  },

  methods:{
                makePayment() {
              window.FlutterwaveCheckout({
                public_key: this.flwKey,
                tx_ref: this.reference,
                amount: this.amount,
                currency: this.currency,
                payment_options: this.payment_method,
                customer: {
                  name: this.name,
                  email: this.email,
                },
                callback: response => this.callback(response),
                customizations: {
                  title: this.custom_title,
                  description: "Payment for items in cart",
                  logo: this.custom_logo,
                },
              })
            },

    selectFee(){
      if (this.country == "USD"){
        this.fee= 8
      }else if(this.country == "NGN") {
        this.fee = 3000
      }else if(this.country == "KES") {
        this.fee = 870
      }
      else if(this.country == "AUD") {
        this.fee = 10.2
      }
      else if(this.country == "AED") {
        this.fee = 30
      }
      else if(this.country == "CAD") {
        this.fee = 10
      }
      else if(this.country == "EUR") {
        this.fee = 7
      }
      else if(this.country == "GBP") {
        this.fee = 6
      }else if(this.country == "GHS") {
        this.fee = 46
      } else if(this.country == "SAR") {
        this.fee = 30
      } else if(this.country == "ZAR") {
        this.fee = 120
      }
      },
      callbackFlutter(response) {
      this.flutterwaveRef = response.referenceFlutter
    },
    close: () => {
     alert("You closed checkout page")
     this.error = "You closed checkout page"
     this.snackbar = true
    },
    }
}
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,700;1,100&display=swap");

html,
body {
  font-family: "Poppins", sans-serif;
}

#app {
  font-family: "Poppins", sans-serif;
}

.v-btn {
  text-transform: none !important;
}

.fadein {
  animation: fadeIn 3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadein-down {
  animation: fadeInDown 3s;
}

@keyframes fadeInDown {
  from {
    top: -2px;
    opacity: 0;
  }
  to {
    top: 1px;
    opacity: 1;
  }
}
</style>
