import { Course } from '@services/meicFeedbackAPI'
import { isMobile } from '@utils'
import { getReviewPath } from '@utils/routes'

export const whatsappUrls = {
  // For mobile devices - tries to open app directly
  mobile: `whatsapp://send`,
  // Fallback for mobile if app not installed
  mobileFallback: `https://wa.me/`,
  // For desktop - opens WhatsApp Web
  desktop: `https://web.whatsapp.com/send`
}

export function getOpenWhatsappAppUrl(message: string) {
  return whatsappUrls.mobile + '?text=' + encodeURIComponent(message)
}

export function getOpenWhatsappWebUrl(message: string) {
  return whatsappUrls.desktop + '?text=' + encodeURIComponent(message)
}

export interface OpenWhatsappData {
  text: string
}
export async function openWhatsapp({ text }: OpenWhatsappData) {
  if (isMobile()) {
    window.open(getOpenWhatsappAppUrl(text))
  } else {
    window.open(getOpenWhatsappWebUrl(text), '_blank')
  }
}

// The browser navigator.share does not look very good...
// For now we're just using the native app or web
// if (isMobile() && navigator.share) {
//   console.log('navigator.share is set')
//   try {
//     await navigator.share({ text: text })
//   } catch (err) {
//     // If native share fails, fall back to WhatsApp direct
//     console.log('Caught error', err)
//     openWhatsappFallback(text)
//   }
// } else {
//   console.log('No navigator.share')
//   openWhatsappFallback(text)
// }

export function getAskForFeedbackMessage(course: Course) {
  const feedbackUrl = `${window.location.origin}${getReviewPath({ courseId: course.id })}`
  const acronym = course.acronym
  return `Boas!! Podias dizer-me como foi a tua experiência a fazer ${acronym}?\n\n${feedbackUrl}\n\nObrigado!!!`
}
