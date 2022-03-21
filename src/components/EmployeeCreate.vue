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
              Please verify Employee information.
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
                    v-model="employee.employee_number"
                    label="Employee Number"
                    required
                    type="number"
                    />

                    <v-text-field
                    v-model="employee.name"
                    label="Name"
                    required
                    />

                    <v-text-field
                    v-model="employee.city"
                    label="City"
                    required
                    />
                    <v-text-field
                    v-model="employee.state"
                    label="State"
                    required
                    />

                    <v-text-field
                    v-model="employee.email"
                    label="Email"
                    required
                    />


                </v-container>
                <v-btn v-if="!isUpdate" class="blue white--text" @click="createEmployee">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue white--text" @click="updateEmployee">Update</v-btn>
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
    name: 'EmployeeCreate',
    components: {},
    data() {
      return {
        showError: false,
        employee: {},
        pageTitle: "Add New Employee",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createEmployee() {
        apiService.addNewEmployee(this.employee).then(response => {
          if (response.status === 201) {
            this.employee = response.data;
             this.showMsg = "";
            router.push('/employee-list/new');
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
         router.push("/employee-list");
      },
      updateEmployee() {
        apiService.updateEmployee(this.employee).then(response => {
          if (response.status === 200) {
            this.employee = response.data;
            router.push('/employee-list/update');
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
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Employee";
        this.isUpdate = true;
        apiService.getEmployee(this.$route.params.pk).then(response => {
          this.employee = response.data;
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