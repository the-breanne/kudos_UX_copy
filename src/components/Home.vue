<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <h2>
            Welcome to Kudos, {{validUserName}}
          </h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="20"
            sm="10"
            md="10"
        >

            <v-container
              fluid
              grid-list-md
              align="center"
              justify="center"
              >
              <v-row 
              align="center"
              justify="center">
                
                <v-col
                align="center"
                justify="center">

                      <v-btn flat color="teal lighten-4" @click="viewTasks">View Tasks</v-btn>

                </v-col>
                <v-col
                align="center"
                justify="center">

                      <v-btn flat color="teal lighten-4" @click="viewMeetings">View Meetings</v-btn>

                </v-col>
                <v-col
                align="center"
                justify="center">

                      <v-btn flat color="teal lighten-4" @click="viewFeedbacks">View Feedbacks</v-btn>

                </v-col>
              </v-row>
            </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import router from '../router';

  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewFeedbacks() {
        router.push('/feedback-list');
      },
      viewMeetings() {
        router.push('/meeting-list');
      },
      viewTasks() {
        router.push('/task-list');
      },
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>
