<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>Kudos</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New meeting has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Meeting information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Meeting has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
            <v-data-table
              :headers="headers"
              :items="meetings"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="!isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.emp_name }}</td>
                        <td align="left">{{ props.item.mang_name }}</td>
                        <td align="left">{{ props.item.message }}</td>
                        <td nowrap="true" align="left">{{ props.item.created_date }}</td>
                        <td align="center"><v-icon @click="updateMeeting(props.item)">mdi-pencil</v-icon></td>
                        <td align="center"><v-icon @click="deleteMeeting(props.item)">mdi-delete</v-icon></td>
                      </tr>
                    </template>
              </v-data-table>
              <v-data-iterator
                :items="meetings"
                hide-default-footer
                v-else
              >
                <template v-slot:default="{ items, isExpanded, expand }">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item.name"
                      cols="12"
                    >
                      <v-card>
                        <v-card-title class="pb-0 pt-0 pl-0">
                          <v-col cols="9" class="text-left body-2 text-truncate">{{item.employee_number}} - {{item.category }}</v-col>
                          <v-col cols="3" class="text-center">
                            <v-card-actions>
                              <v-icon @click="updateMeeting(item)" class="small">mdi-pencil</v-icon>
                              <v-icon @click="deleteMeeting(item)" class="small">mdi-delete</v-icon>
                              <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-list v-show="isExpanded(item)" dense>
                          <v-list-item>
                            <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                          </v-list-item>
                
              
              
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
              <v-btn class="blue-grey darken-2 mt-4 white--text" @click="addNewMeeting">Add Meeting</v-btn>
              <v-btn class="blue-grey darken-2 mt-4 white--text" @click="$router.push('MeetingForm')">Request Meeting</v-btn>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "MeetingList",
    data: () => ({
      meetings: [],
      validUserName: "Guest",
      meetingSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: "Name", sortable: false, align: 'left',},
        {text: "Manager's Name", sortable: false, align: 'left',},
        {text: 'Message', sortable: false, align: 'left',},
        {text: 'Meeting Date', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}

      ],

    }),
    mounted() {
      this.getMeetings();
      this.showMessages();
    },
    methods: {
      onResize() {
          if (window.innerWidth < 600)
            this.isMobile = true;
          else
            this.isMobile = false;
        },
      showMessages(){
        console.log(this.$route.params.msg)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      getMeetings() {
        apiService.getMeetingList().then(response => {
          this.meetings = response.data.data;
          this.meetingSize = this.meetings.length;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
      addNewMeeting() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/meeting-create');
        } else {
          router.push("/auth");
        }
      },
      updateMeeting(meeting) {
        router.push('/meeting-create/' + meeting.pk);
      },
      deleteMeeting(meeting) {
        apiService.deleteMeeting(meeting.pk).then(response => {
          if (response.status === 204) {
            router.push('/meeting-list/deleted/')
            this.getMeetings()
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      }
    }
  };
</script>
