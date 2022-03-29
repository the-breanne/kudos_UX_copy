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
            New employee has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Employee information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Employee has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
            <v-data-table
              :headers="headers"
              :items="employees"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="!isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.employee_number }}</td>
                        <td align="left">{{ props.item.name }}</td>
                        <td nowrap="true" align="left">{{ props.item.city }}</td>
                        <td nowrap="true" align="left">{{ props.item.state }}</td>
                        <td nowrap="true" align="left">{{ props.item.email }}</td>
                        <td align="center"><v-icon @click="updateEmployee(props.item)">mdi-pencil</v-icon></td>
                        <td align="center"><v-icon @click="deleteEmployee(props.item)">mdi-delete</v-icon></td>
                      </tr>
                    </template>
              </v-data-table>
              <v-data-iterator
                :items="employees"
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
                          <v-col cols="9" class="text-left body-2 text-truncate">{{ item.name }}</v-col>
                          <v-col cols="3" class="text-center">
                            <v-card-actions>
                              <v-icon @click="updateEmployee(item)" class="small">mdi-pencil</v-icon>
                              <v-icon @click="deleteEmployee(item)" class="small">mdi-delete</v-icon>
                              <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-list v-show="isExpanded(item)" dense>

                          <v-list-item>
                            <v-list-item-content>Email:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.email }}</v-list-item-content>
                          </v-list-item>

                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
              <v-btn class="blue-grey darken-2 mt-4 white--text" @click="addNewEmployee">Add Employee</v-btn>
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
    name: "EmployeeList",
    data: () => ({
      employees: [],
      validUserName: "Guest",
      employeeSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: 'Employee Number', sortable: false, align: 'left',},
        {text: 'Name', sortable: false, align: 'left',},
        {text: 'City', sortable: false, align: 'left',},
        {text: 'State', sortable: false, align: 'left',},
        {text: 'Email', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}
      ],

    }),
    mounted() {
      this.getEmployees();
      this.showMessages();
    },
    methods: {
      onResize() {
          if (window.innerWidth > 600)
            this.isMobile = false;
          else
            this.isMobile = true;
        },
      showMessages(){
        console.log(this.$route.params.msg)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      getEmployees() {
        apiService.getEmployeeList().then(response => {
          this.employees = response.data.data;
          this.employeeSize = this.employees.length;
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
      addNewEmployee() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/employee-create');
        } else {
          router.push("/auth");
        }
      },
      updateEmployee(employee) {
        router.push('/employee-create/' + employee.pk);
      },
      deleteEmployee(employee) {
        apiService.deleteEmployee(employee.pk).then(response => {
          if (response.status === 204) {
            router.push('/employee-list/deleted/')
            this.getEmployees()
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
