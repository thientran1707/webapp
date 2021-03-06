const initial_state = {}

const handlers =
{
	'user profile: get user pending': (result, state) =>
	{
		const new_state = 
		{
			...state,
			error : undefined
		}

		return new_state
	},

	'user profile: get user done': (result, state) =>
	{
		const new_state = 
		{
			...state,
			user : result
		}

		return new_state
	},

	'user profile: get user failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			error
		}

		return new_state
	},

	"user profile: get user's latest activity time pending": (result, state) =>
	{
		const new_state = 
		{
			...state,
			latest_activity_time_error : undefined
		}

		return new_state
	},

	"user profile: get user's latest activity time done": (result, state) =>
	{
		const new_state = 
		{
			...state,
			latest_activity_time : result.time
		}

		return new_state
	},

	"user profile: get user's latest activity time failed": (error, state) =>
	{
		const new_state = 
		{
			...state,
			latest_activity_time_error : error
		}

		return new_state
	},

	'update user pending': (result, state) =>
	{
		const new_state = 
		{
			...state,
			updating_user : true,
			update_error : undefined
		}

		return new_state
	},

	'update user done': (result, state) =>
	{
		const new_state = 
		{
			...state,
			user : result,
			updating_user : false
		}

		return new_state
	},

	'update user failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			update_error : error,
			updating_user : false
		}

		return new_state
	},

	'dismiss user update error': (result, state) =>
	{
		const new_state = 
		{
			...state,
			update_error : undefined
		}

		return new_state
	},

	'user profile: upload user picture pending': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploading_picture : true,
			user_picture_upload_error : undefined
		}

		return new_state
	},

	'user profile: upload user picture done': (result, state) =>
	{
		const new_state = 
		{
			...state,
			// uploaded_picture  : result,
			// Will be set to `false` when the image is prefetched
			// to avoid a flash of a not yet loaded image.
			// uploading_picture : false
		}

		return new_state
	},

	'user profile: upload user picture failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_picture          : undefined,
			user_picture_upload_error : error,
			uploading_picture         : false
		}

		return new_state
	},

	// Prefetching is done to avoid a flash of a not yet loaded image

	'prefetching uploaded user picture done': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploading_picture : false,
			uploaded_picture  : result
		}

		return new_state
	},

	'prefetching uploaded user picture failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_picture          : undefined,
			user_picture_upload_error : true,
			uploading_picture         : false
		}

		return new_state
	},

	'save user picture done': (result, state) =>
	{
		const new_state = 
		{
			...state,
			user:
			{
				...state.user,
				picture : result
			}
		}

		return new_state
	},

	'save user picture failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			update_error : error
		}

		return new_state
	},

	'dismiss uploaded user picture': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_picture : undefined,
			user:
			{
				...state.user,
				picture : state.uploaded_picture
			}
		}

		return new_state
	},

	'dismiss user picture upload error': (result, state) =>
	{
		const new_state = 
		{
			...state,
			user_picture_upload_error : undefined
		}

		return new_state
	},

	'dismiss uploaded user picture': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_picture : undefined
		}

		return new_state
	},

	'uploaded user picture is too big': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_user_picture_is_too_big_error : true
		}

		return new_state
	},

	'dismiss uploaded user picture is too big error': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploaded_user_picture_is_too_big_error : undefined
		}

		return new_state
	},

	'unsupported uploaded user picture file': (result, state) =>
	{
		const new_state = 
		{
			...state,
			unsupported_uploaded_user_picture_file_error : true
		}

		return new_state
	},

	'dismiss unsupported uploaded user picture file error': (result, state) =>
	{
		const new_state = 
		{
			...state,
			unsupported_uploaded_user_picture_file_error : undefined
		}

		return new_state
	}
}

// applies a handler based on the action type
// (is copy & paste'd for all action response handlers)
export default function(state = initial_state, action_data = {})
{
	return (handlers[action_data.type] || ((result, state) => state))(action_data.result || action_data.error || action_data, state)
}