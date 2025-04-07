const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/exercise1', component: () => import('pages/exercise1/ExerciseOne.vue') },
      { path: '/exercise2', component: () => import('pages/exercise2/ExerciseTwo.vue') },
      { path: '/exercise3', component: () => import('pages/exercise3/ExerciseThree.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
