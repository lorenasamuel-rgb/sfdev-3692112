// Supabase returns codes on newer versions and only messages on older ones, so
// both are checked and folded into the error codes the account page already
// knows how to translate.
export function mapAuthError(error) {
  if (!error) return null
  const code = String(error.code ?? '').toLowerCase()
  const message = String(error.message ?? '').toLowerCase()

  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'badCredentials'
  }
  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'emailNotConfirmed'
  }
  if (
    code === 'user_already_exists' ||
    code === 'email_exists' ||
    message.includes('already registered') ||
    message.includes('already been registered')
  ) {
    return 'emailTaken'
  }
  if (code === 'weak_password' || message.includes('password should be at least')) {
    return 'passwordShort'
  }
  if (code === 'validation_failed' || message.includes('unable to validate email')) {
    return 'emailInvalid'
  }
  if (
    code === 'over_request_rate_limit' ||
    code === 'over_email_send_rate_limit' ||
    message.includes('rate limit')
  ) {
    return 'rateLimited'
  }
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'network'
  }
  return 'remoteUnknown'
}

export function accountFromUser(user) {
  if (!user) return null
  const metadata = user.user_metadata ?? {}
  return {
    id: user.id,
    name: metadata.name ?? metadata.full_name ?? '',
    email: user.email ?? '',
    createdAt: user.created_at ?? new Date().toISOString(),
  }
}

// signUp resolves with no session when the project asks for email confirmation.
export function needsEmailConfirmation(data) {
  return Boolean(data?.user) && !data?.session
}
