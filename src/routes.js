
import { Icon } from '@chakra-ui/react'
import { MdHome, MdPerson } from 'react-icons/md'

import {
  MdOutlineMiscellaneousServices, MdOutlineSettings,
  MdOutlineContactMail,
  MdOutlineCardGiftcard,
  MdInsights
} from 'react-icons/md'

import {
  AiOutlineCalendar, AiOutlineSchedule, AiTwotoneBank
} from 'react-icons/ai'

// Admin Imports
import AddBank from 'views/admin/addBank'
import MainDashboard from 'views/admin/default'
import Member from 'views/admin/member'
import Plan from 'views/admin/plan'
import Enrollment from 'views/admin/enrollment'
import Service from 'views/admin/service'
import Leads from 'views/admin/leads'
import Rewards from 'views/admin/reward'
import Marketing from 'views/admin/marketing'
import Visit from 'views/admin/visit'
import MemberDetail from './views/admin/memberDetail/index'
import Business from './views/create/business/index'
import Office from './views/create/office/index'
import subscriptionDetail from './views/admin/subscriptionDetail/index'
import NotFoundPage from './views/Error/NotFoundPage'

// Auth Imports
import SignInCentered from 'views/auth/signIn'
import SignUpCentered from 'views/auth/signUp'
import ForgotPassword from 'views/auth/forgotPassword'
import ResetPass from 'views/auth/resetPass'
import VerifyEmail from 'views/auth/verifyMail'
import VerifyRegister from 'views/auth/verifyRegister'

// Payment import 
import Payment from 'views/payment/pay'


const routes = [
  {
    private: true,
    name: 'Members Detail',
    layout: '/create',
    path: '/office',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Office,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Members Detail',
    layout: '/create',
    path: '/business',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Business,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Create Office',
    layout: '/admin',
    path: '/create-office',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Office,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Members Detail',
    layout: '/admin',
    path: '/member-detail',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: MemberDetail,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Subscription Detail',
    layout: '/admin',
    path: '/subscription-detail',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: subscriptionDetail,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Error 404',
    layout: '/error',
    path: '/error404',
    icon: (
      <Icon as={AiOutlineSchedule} width='20px' height='20px' color='inherit' />
    ),
    component: NotFoundPage
  },
  {
    private: false,
    name: 'SignIn',
    layout: '/auth',
    path: '/signin',
    component: SignInCentered,
    hide: true // This option hide element from showing in sidebar
  },

  {
    private: false,
    name: 'SignUp',
    layout: '/auth',
    path: '/reset-password',
    component: ResetPass,
    hide: true // This option hide element from showing in sidebar
  },

  {
    private: false,
    name: 'Verify Register',
    layout: '/auth',
    path: '/verify-register',
    component: VerifyRegister,
    hide: true // This option hide element from showing in sidebar
  },

  {
    private: false,
    name: 'Verify Email',
    layout: '/auth',
    path: '/verify-mail/:id',
    component: VerifyEmail,
    hide: true // This option hide element from showing in sidebar
  },

  {
    private: false,
    name: 'SignUp',
    layout: '/auth',
    path: '/forgot-password',
    component: ForgotPassword,
    hide: true // This option hide element from showing in sidebar
  },

  {
    private: false,
    name: 'SignUp',
    layout: '/auth',
    path: '/signup',
    component: SignUpCentered,
    hide: true // This option hide element from showing in sidebar
  },
  {
    private: true,
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  },
  {
    private: true,
    name: 'Member Enrollment',
    layout: '/admin',
    path: '/member-enrollment',
    icon: (
      <Icon as={AiOutlineSchedule} width='20px' height='20px' color='inherit' />
    ),
    component: Enrollment
  },
  {
    private: true,
    name: 'Log Visit',
    layout: '/admin',
    path: '/visit',
    icon: (
      <Icon as={AiOutlineCalendar} width='20px' height='20px' color='inherit' />
    ),
    component: Visit
  },

  {
    hide: true,
    private: true,
    name: 'payment',
    layout: '/payment',
    path: '/:id',
    component: Payment
  },

  {
    private: true,
    name: 'Members',
    layout: '/admin',
    path: '/members',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Member
  },


  {
    private: true,
    name: 'Plans',
    layout: '/admin',
    path: '/plan',
    icon: (
      <Icon as={AiOutlineSchedule} width='20px' height='20px' color='inherit' />
    ),
    component: Plan
  },

  {
    private: true,
    name: 'Services',
    layout: '/admin',
    path: '/services',
    icon: (
      <Icon as={MdOutlineMiscellaneousServices} width='20px' height='20px' color='inherit' />
    ),
    component: Service
  },

  {
    private: true,
    name: 'Leads',
    layout: '/admin',
    path: '/leads',
    icon: (
      <Icon as={MdOutlineContactMail} width='20px' height='20px' color='inherit' />
    ),
    component: Leads
  },

  {
    private: true,
    name: 'Marketing',
    layout: '/admin',
    path: '/marketing',
    icon: (
      <Icon as={MdInsights} width='20px' height='20px' color='inherit' />
    ),
    component: Marketing
  },

  {
    private: true,
    name: 'Loyalty & Rewards',
    layout: '/admin',
    path: '/rewards',
    icon: (
      <Icon as={MdOutlineCardGiftcard} width='20px' height='20px' color='inherit' />
    ),
    component: Rewards
  },

  {
    hide: true, // This option hide element from showing in sidebar
    private: true,
    name: 'Configure Banking',
    layout: '/admin',
    path: '/add-connected-account',
    icon: (
      <Icon as={AiTwotoneBank} width='20px' height='20px' color='inherit' />
    ),

    component: AddBank,
    secondary: true
  },
  {
    private: true,
    name: 'Settings',
    layout: '/admin',

    icon: (
      <Icon as={MdOutlineSettings} width='20px' height='20px' color='inherit' />
    ),
    children: [
      {
        private: true,
        name: 'Add Bank',
        layout: '/admin',
        path: '/add-connected-account',
        icon: (
          <Icon as={AiTwotoneBank} width='20px' height='20px' color='inherit' />
        ),

        component: AddBank,
        secondary: true
      },

    ],

    secondary: true
  },
]

export default routes
