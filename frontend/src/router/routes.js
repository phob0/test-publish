
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'app_base' */ 'layouts/Default.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import(/* webpackChunkName: 'app_base' */ 'pages/Index.vue') },
      { path: 'home', component: () => import(/* webpackChunkName: 'app_base' */ 'pages/Index.vue') },

      { path: 'settings', name: 'setting.listing', component: () => import(/* webpackChunkName: 'app_settings' */ 'pages/settings/SettingsListingPage.vue') },
      { path: 'settings/create', name: 'setting.create', component: () => import(/* webpackChunkName: 'app_settings' */ 'pages/settings/SettingsPage.vue') },
      { path: 'settings/:id', name: 'setting.edit', component: () => import(/* webpackChunkName: 'app_settings' */ 'pages/settings/SettingsPage.vue') },

      { path: 'users', name: 'user.listing', component: () => import(/* webpackChunkName: 'app_users' */ 'pages/user/UserListingPage.vue') },
      { path: 'users/create', name: 'user.create', component: () => import(/* webpackChunkName: 'app_users' */ 'pages/user/UserPage.vue') },
      { path: 'users/:id', name: 'user.edit', component: () => import(/* webpackChunkName: 'app_users' */ 'pages/user/UserPage.vue') },

      { path: 'locations', name: 'location.listing', component: () => import(/* webpackChunkName: 'app_locations' */ 'pages/location/LocationListingPage.vue') },
      { path: 'locations/create', name: 'location.create', component: () => import(/* webpackChunkName: 'app_locations' */ 'pages/location/LocationPage.vue') },
      { path: 'locations/:id', name: 'location.edit', component: () => import(/* webpackChunkName: 'app_locations' */ 'pages/location/LocationPage.vue') },

      { path: 'medical_conditions', name: 'medicalCondition.listing', component: () => import(/* webpackChunkName: 'app_medical_conditions' */ 'pages/medical_condition/MedicalConditionListingPage.vue') },
      { path: 'medical_conditions/create', name: 'medicalCondition.create', component: () => import(/* webpackChunkName: 'app_medical_conditions' */ 'pages/medical_condition/MedicalConditionPage.vue') },
      { path: 'medical_conditions/:id', name: 'medicalCondition.edit', component: () => import(/* webpackChunkName: 'app_medical_conditions' */ 'pages/medical_condition/MedicalConditionPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'error404',
    component: () => import(/* webpackChunkName: 'app_base' */ 'pages/Error404.vue')
  })
}

export default routes