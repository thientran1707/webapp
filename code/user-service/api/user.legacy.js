import http   from '../../common/http'
// import Url    from '../../client/tools/url'

import store from '../store'

// import {} from './user.base'

api.legacy.post('/legacy/locale', async function({ locale, from_url }, { set_cookie, user })
{
	if (exists(user))
	{
		await store.update_locale(user.id, locale)
	}
	else
	{
		set_cookie('locale', locale, { signed: false })
	}

	return `${address_book.web_server}${from_url}`
},
error => `${address_book.web_server}/error`)