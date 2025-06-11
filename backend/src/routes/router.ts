import { fromIttyRouter } from 'chanfana'
import { cors, Router, withCookies } from 'itty-router'
import { GetCourse, GetCourseFeedback, SubmitFeedback } from './courses'
import { GetDegreeCourseGroups, GetDegreeCourses, GetDegrees } from './degrees'

const { preflight, corsify } = cors({
  origin: [
    'http://localhost:5173',
    'https://meic-feedback.afonsocrg.com',
    'https://ist-feedback.afonsocrg.com'
  ],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

export const router = fromIttyRouter(
  Router({
    before: [preflight, withCookies],
    finally: [corsify]
  }),
  { docs_url: '/docs' }
)

// ---------------------------------------------------------
// Public routes
// ---------------------------------------------------------
// router.get('/courses', GetCourses)
router.get('/courses/:id', GetCourse)
router.get('/courses/:id/feedback', GetCourseFeedback)
router.post('/courses/:id/feedback', SubmitFeedback)
router.get('/degrees', GetDegrees)
router.get('/degrees/:id/courseGroups', GetDegreeCourseGroups)
router.get('/degrees/:id/courses', GetDegreeCourses)

// ---------------------------------------------------------
// Authenticated routes
// ---------------------------------------------------------
// router.all('*', authenticateUser)

// 404 for everything else
router.all('*', () =>
  Response.json(
    {
      success: false,
      error: 'Route not found'
    },
    { status: 404 }
  )
)
