<template>
    <v-btn color="#f5a623" block tile large class="button white--text" justify-end @click="makePayment">
      Register Now
    </v-btn>
 
</template>
    
<script>

  export default {
    name: 'FlutterwaveModal',
          props: {
            isProduction: {
              type: Boolean,
              required: false,
              default: false //set to true if you are going live
            },
            email: {
              type: null,
              required: true
            },
            amount: {
              type: null,
              required: true
            },
            flwKey: {
              type: String,
              required: true
            },
            callback: {
              type: Function,
              required: true,
              default: () => {
                console.log('Payment made, verify payment')
              }
            },
            close: {
              type: Function,
              required: true,
              default: () => {}
            },
            currency: {
              type: String,
              default: "ZAR"
            },
            country: {
              type: String,
              default: "ZA"
            },
            customTitle: {
              type: String,
              default: ""
            },
            customLogo: {
              type: String,
              default: ""
            },
            reference: {
              type: String,
              default: ""
            },
            paymentMethod: {
              type: String,
              default: "card,mobilemoney,ussd"
            }
          },

    created() {
            const script = document.createElement("script")
            script.src = !this.isProduction
              ? "https://ravemodal-dev.herokuapp.com/v3.js"
              : "https://checkout.flutterwave.com/v3.js"
            document.getElementsByTagName("head")[0].appendChild(script)
          },

          methods: {
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
            }
          },
        
    }

    </script>