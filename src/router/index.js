import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ForgetPasswordView from '../views/ForgetPasswordView.vue'
import PostView from '../views/PostView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import ProfileView from '../views/ProfileView.vue'
import ValidationView from '../views/ValidationView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ActivationView from '../views/ActivationView.vue'
import UpdateUsernameView from '../views/UpdateUsernameView.vue'
import UpdatePasswordView from '../views/UpdatePasswordView.vue'
import GetPlaceIdView from '../views/GetPlaceIdView.vue'
import AuthorPostListView from '../views/AuthorPostListView.vue'
import UpdateProfileView from '../views/UpdateProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPasswordView
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: PostView
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePostView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/validation',
    name: 'Validation',
    component: ValidationView
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPasswordView
  },
  {
    path: '/activation',
    name: 'Activation',
    component: ActivationView
  },
  {
    path: '/updateusername',
    name: 'updateusername',
    component: UpdateUsernameView
  },
  {
    path: '/updatepassword',
    name: 'updatepassword',
    component: UpdatePasswordView
  },
  {
    path: '/getplaceid',
    name: 'getplaceid',
    component: GetPlaceIdView
  },
  {
    path: '/authorpostlist',
    name: 'authorpostlist',
    component: AuthorPostListView
  },
  {
    path: '/updateprofile',
    name: 'updateprofile',
    component: UpdateProfileView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
