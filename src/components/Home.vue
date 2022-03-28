<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <blockquote>
            &#8220;Welcome {{validUserName}}!&#8221;
            <footer>
              <small>
                <em>Kudos</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
            sm="10"
            md="10"
        >

            <v-container
              fluid
              grid-list-md
            >
              <v-row>
                <v-col>
                  <v-card>

                    <v-card-text>
                      <div class="RosyBrown--text text-h6">
                        Tasks
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="OldLace" @click="viewTasks">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>

                    <v-card-text>
                      <div class="RosyBrown--text text-h6">
                        Feedback
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="OldLace" @click="viewFeedback">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>

                    <v-card-text>
                      <div class="RosyBrown--text text-h6">
                        Meetings
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="OldLace" @click="viewMeetings">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
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
      viewFeedback() {
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
