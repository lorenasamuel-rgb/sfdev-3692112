import { socialLinks } from '../data/social.js'
import { useLanguage } from '../i18n/context.js'

export function SocialLinks() {
  const { t } = useLanguage()

  return (
    <div className="social">
      <h2 className="social-label">{t('chrome.social')}</h2>
      <ul className="social-list">
        {socialLinks.map((item) => (
          <li key={item.id}>
            <a
              className="social-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={t('chrome.socialLink', { network: item.label })}
            >
              <svg viewBox={item.viewBox} aria-hidden="true" focusable="false">
                <path d={item.path} fill="currentColor" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
