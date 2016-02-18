import { add_redirect } from '../helpers/redirection'

export default function(error, { url, redirect, proceed })
{
	// `url` will be passed as a Url parameter
	const request = encodeURIComponent(url)

	// not authenticated
	if (error.status === 401)
	{
		return redirect(add_redirect('/unauthenticated', request))
	}

	// not authorized
	if (error.status === 403)
	{
		return redirect(add_redirect('/unauthorized', request))
	}

	// log the error if running on the server side
	if (_server_)
	{
		log.error(`Rendering error while fetching url "${url}"`)
		log.error(error)
	}

	// some kind of server error happened

	// prevents infinite redirect to the error page
	if (url.starts_with('/error?'))
	{
		throw error
	}

	// redirect to the generic error page
	redirect(add_redirect('/error', request))
}