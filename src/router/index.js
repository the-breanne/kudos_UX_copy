import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import EmployeeList from '@/components/EmployeeList'
import EmployeeCreate from '@/components/EmployeeCreate'
import ManagerList from '@/components/ManagerList'
import ManagerCreate from '@/components/ManagerCreate'
import FeedbackList from '@/components/FeedbackList'
import FeedbackCreate from '@/components/FeedbackCreate'
import MeetingList from '@/components/MeetingList'
import MeetingCreate from '@/components/MeetingCreate'
import TaskList from '@/components/TaskList'
import TaskCreate from '@/components/TaskCreate'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/employee-list',
      name: 'EmployeeList',
      component: EmployeeList
    },
    {
      path: '/employee-list/:msg',
      name: 'EmployeeUpdatedList',
      component: EmployeeList
    },
    {
      path: '/employee-create',
      name: 'EmployeeCreate',
      component: EmployeeCreate
    },
    {
      path: '/employee-create/:pk',
      name: 'EmployeeUpdate',
      component: EmployeeCreate
    },

    {
      path: '/manager-list',
      name: 'ManagerList',
      component: ManagerList
    },
    {
      path: '/manager-list/:msg',
      name: 'ManagerUpdatedList',
      component: ManagerList
    },
    {
      path: '/manager-create',
      name: 'ManagerCreate',
      component: ManagerCreate
    },
    {
      path: '/manager-create/:pk',
      name: 'ManagerUpdate',
      component: ManagerCreate
    },

    {
      path: '/feedback-list',
      name: 'FeedbackList',
      component: FeedbackList
    },
    {
      path: '/feedback-list/:msg',
      name: 'FeedbackUpdatedList',
      component: FeedbackList
    },
    {
      path: '/feedback-create',
      name: 'FeedbackCreate',
      component: FeedbackCreate
    },
    {
      path: '/feedback-create/:pk',
      name: 'FeedbackUpdate',
      component: FeedbackCreate
    },
    {
      path: '/meeting-list',
      name: 'MeetingList',
      component: MeetingList
    },
    {
      path: '/meeting-list/:msg',
      name: 'MeetingUpdatedList',
      component: MeetingList
    },
    {
      path: '/meeting-create',
      name: 'MeetingCreate',
      component: MeetingCreate
    },
    {
      path: '/meeting-create/:pk',
      name: 'MeetingUpdate',
      component: MeetingCreate
    },
    {
      path: '/task-list',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/task-list/:msg',
      name: 'TaskUpdatedList',
      component: TaskList
    },
    {
      path: '/task-create',
      name: 'TaskCreate',
      component: TaskCreate
    },
    {
      path: '/task-create/:pk',
      name: 'TaskUpdate',
      component: TaskCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
