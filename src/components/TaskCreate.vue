<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Task information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                    v-model="task.name"
                    label="Task Name"
                    required
                    />
                    <v-text-field
                    v-model="task.description"
                    label="Description"
                    required
                    />
                    
                    <v-text-field
                    v-model="task.priority"
                    label="Priority Number"
                    required
                    type="number"
                    />


                    <v-text-field
                    v-model="task.deadline"
                    label="Deadline"
                    required
                    type="date"

                    />


                </v-container>
                <v-btn v-if="!isUpdate" class="blue-grey darken-2 white--text" @click="createTask">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue-grey darken-2 white--text" @click="updateTask">Update</v-btn>
                <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'TaskCreate',
    components: {},
    data() {
      return {
        employees: [],
        showError: false,
        task: {},
        pageTitle: "Add New Task",
        isUpdate: false,
        showMsg: '',
      };
    },
    computed:{
      list:{
      get () {
            return this.employees
        },
          set (newValue) {
            this.employees = newValue
          }
      }
    },
    methods: {
      getEmployees() {
        apiService.getEmployeeList().then(response => {
          this.employees = response.data.data;
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
      createTask() {
        apiService.addNewTask(this.task).then(response => {
          if (response.status === 201) {
            this.task = response.data;
             this.showMsg = "";
            router.push('/task-list/new');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
         router.push("/task-list");
      },
      updateTask() {
        apiService.updateTask(this.task).then(response => {
          if (response.status === 200) {
            this.task = response.data;
            router.push('/task-list/update');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      this.getEmployees();
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Task";
        this.isUpdate = true;
        apiService.getTask(this.$route.params.pk).then(response => {
          this.task = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
