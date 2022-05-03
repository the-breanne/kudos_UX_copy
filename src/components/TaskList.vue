<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">

          <h4>This is your task list. Here you can view your tasks and add new tasks to your list.</h4>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New task has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Task information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Task has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
            <v-data-table
              :headers="headers"
              :items="tasks"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="!isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.name }}</td>
                        <td nowrap="true" align="left">{{ props.item.description }}</td>
                        <td nowrap="true" align="left">{{ props.item.priority }}</td>
                        <td nowrap="true" align="left">{{ props.item.deadline }}</td>
                        <td align="center"><v-icon @click="updateTask(props.item)">mdi-pencil</v-icon></td>
                        <td align="center"><v-icon @click="deleteTask(props.item)">mdi-delete</v-icon></td>
                      </tr>
                    </template>
              </v-data-table>
              <v-data-iterator
                :items="tasks"
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
                              <v-icon @click="updateTask(item)" class="small">mdi-pencil</v-icon>
                              <v-icon @click="deleteTask(item)" class="small">mdi-delete</v-icon>
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
              <v-btn class="blue-grey darken-2 mt-4 white--text" @click="addNewTask">Add Task</v-btn>
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
    name: "TaskList",
    data: () => ({
      tasks: [],
      validUserName: "Guest",
      taskSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: 'Task Name', sortable: false, align: 'left',},
        {text: 'Description', sortable: false, align: 'left',},
        {text: 'Priority', sortable: false, align: 'left',},
        {text: 'Deadline', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}

      ],

    }),
    mounted() {
      this.getTasks();
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
      getTasks() {
        apiService.getTaskList().then(response => {
          this.tasks = response.data.data;
          this.taskSize = this.tasks.length;
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
      addNewTask() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/task-create');
        } else {
          router.push("/auth");
        }
      },
      updateTask(task) {
        router.push('/task-create/' + task.pk);
      },
      deleteTask(task) {
        apiService.deleteTask(task.pk).then(response => {
          if (response.status === 204) {
            router.push('/task-list/deleted/')
            this.getTasks()
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
