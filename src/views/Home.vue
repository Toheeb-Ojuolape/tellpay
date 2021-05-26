<template>
    <v-app>
    <v-main style="background:#baddf6">
      <v-container>
      <v-row no-gutters class="justify-center">
          <v-card tile style="padding:30px" width="600px"  height="600px" class="elevation-24">
          <v-chip color="red" small class="white--text">Early Bird ends in:</v-chip>
          <div class="">
  <div id="countdown">
    <ul>
      <li><span id="dayss">0</span>days</li>
      <li><span id="hourss">0</span>Hours</li>
      <li><span id="minutess">0</span>Minutes</li>
      <li><span id="secondss">0</span>Seconds</li>
    </ul>
  </div>
</div>
           <p style="font-size:19px" class="font-weight-bold"> Register for Scriptwriting MasterClass below: </p>
            <v-form id="register" @submit="makePayment()">
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
          <v-card-actions class="justify-end" style="margin-top:-20px">
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
         <v-btn class="fadein-down justify-center" block style="text-align:center" rounded large color="#24cc63" href="https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20Tell!.%20I%20would%20like%20to%20register%20for%20the%20Script%20writing%20Masterclass.%20My%20name%20is"><v-icon class="white--text">mdi-whatsapp</v-icon><span class="white--text px-2" >Pay Through WhatsApp</span></v-btn>
         </v-card>      
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

  created(){
    (function () {
   const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let birthday = "May 26, 2021 00:00:00",
      countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          let headline = document.getElementById("headline"),
              countdown = document.getElementById("countdown"),
              content = document.getElementById("content");

          headline.innerText = "It's my birthday!";
          countdown.style.display = "none";
          content.style.display = "block";

          clearInterval(x);
        }
        //seconds
      }, 0)
  }());
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
        this.fee = 5000
      }else if(this.country == "KES") {
        this.fee = 900
      }
      else if(this.country == "AUD") {
        this.fee = 15
      }
      else if(this.country == "AED") {
        this.fee = 60
      }
      else if(this.country == "CAD") {
        this.fee = 21
      }
      else if(this.country == "EUR") {
        this.fee = 7
      }
      else if(this.country == "GBP") {
        this.fee = 12
      }else if(this.country == "GHS") {
        this.fee = 51
      } else if(this.country == "SAR") {
        this.fee = 53
      } else if(this.country == "ZAR") {
        this.fee = 119
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

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  color: #333;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-weight: bold;
  letter-spacing: .100rem;
  text-transform: uppercase;
  font-family:'Montserrat'
}

li {
  display: inline-block;
  font-size: 0.7em;
  list-style-type: none;
  padding: 1em;
  text-transform: capitalize;
}

li span {
  display: block;
  font-size: 1.0rem;
}

.message {
  font-size: 1rem;
}

#content {
  display: none;
  padding: 5px;
}


@media all and (max-width: 768px) {
  h1 {
    font-size: 20px;
  }
  
  li {
    font-size: 14px;
    padding: 5px;
  }
  
  li span {
    font-size: 16px;
  }
}

html,
body {
  font-family: "Montserrat"
}

#app {
  font-family: "Montserrat"
}

.v-btn {
  text-transform: none !important;
}

.fadein {
  animation: fadeIn 4s;
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
  animation: fadeInDown 6s;
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
