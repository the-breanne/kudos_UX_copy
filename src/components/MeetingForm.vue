<template>
  <v-main>


    <div class="container">
        <form @submit.prevent="sendEmail">
          <label>Name</label>
          <input 
            type="text" 
            v-model="name"
            name="name"
            placeholder="Your Name"
          >
          <label>Manager's Email</label>
          <input 
            type="email" 
            v-model="email"
            name="email"
            placeholder="Manager's Email"
            >
          <label>Message</label>
          <textarea 
            name="message"
            v-model="message"
            cols="30" rows="5"
            placeholder="Please list the date, time, and description for your requested meeting.">
          </textarea>
          
          <input type="submit" value="Send">
        </form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('service_jyu70n5', 'template_xmaup7v', e.target, 'QPJgakbxKSJMQRGHT', {
          name: this.name,
          email: this.email,
          message: this.meessage
        })
      } catch (error) {
          console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
    },
  }
}
</script>

<style scoped>
* {box-sizing: border-box;}
label {
  float: left;
}
input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type=submit]:hover {
  background-color: #b8c7b9;
}
.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  width: 50%;
}
</style>