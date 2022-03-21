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
              Please verify Manager information.
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

                    <!--v-text-field
                    v-model="manager.employee_number"
                    label="Employee"
                    required
                    type="number"
                    /-->
                    <v-select
                    v-model="manager.employee"
                    label="Employee Number"
                    :items="list"
                    item-value='pk'
                    item-text='employee_number'
                    ></v-select>

                    <v-text-field
                    v-model="manager.manager_number"
                    label="Manager Number"
                    required
                    />
                    <v-text-field
                    v-model="manager.name"
                    label="Name"
                    required
                    />
                    <v-text-field
                    v-model="manager.city"
                    label="City"
                    required
                    />
                    <v-text-field
                    v-model="manager.state"
                    label="State"
                    required
                    />               
                    <v-text-field
                    v-model="manager.email"
                    label="Email"
                    required
                    />                         
                    <v-text-field
                    v-model="manager.created_date"
                    label="Created Date"
                    required
                    type="date"
                    />
                    <v-text-field
                    v-model="manager.updates_date"
                    label="Updated Date"
                    required
                    type="date"

                    />


                </v-container>
                <v-btn v-if="!isUpdate" class="blue white--text" @click="createManager">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue white--text" @click="updateManager">Update</v-btn>
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
    name: 'ManagerCreate',
    components: {},
    data() {
      return {
        employees: [],
        showError: false,
        manager: {},
        pageTitle: "Add New Manager",
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
      createManager() {
        apiService.addNewManager(this.manager).then(response => {
          if (response.status === 201) {
            this.manager = response.data;
             this.showMsg = "";
            router.push('/manager-list/new');
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
         router.push("/manager-list");
      },
      updateManager() {
        apiService.updateManager(this.manager).then(response => {
          if (response.status === 200) {
            this.manager = response.data;
            router.push('/manager-list/update');
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
        this.pageTitle = "Edit Manager";
        this.isUpdate = true;
        apiService.getManager(this.$route.params.pk).then(response => {
          this.manager = response.data;
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
