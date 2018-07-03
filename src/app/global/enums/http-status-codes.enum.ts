export type HttpStatusCodes = 400 | 403 | 404 | 500 | 503 | 520;

export const HttpErrorMessages: { [index: number]: { title: string, message: string } } = {
    400: {
        title: 'Malformed Request',
        message: 'The request we recieved was not in the correct form.'
    },
    403: {
        title: 'Access Forbidden',
        message: 'You are not allowed to access this page at this time.  This may possibly be resolved by logging into the website again.'
    },
    404: {
        title: 'Page Not Found',
        message: 'The page you requested was not found on the server.'
    },
    500: {
        title: 'Internal Server Error',
        message: 'The server encountered an internal error or misconfiguration and was unable to make the request.  Please contact the server administrator with the time that the error occured.'
    },
    503: {
        title: 'Server Unavailable',
        message: 'The server is either unavaible or is down for maintenance.  Please try again later.'
    },
    520: {
        title: 'An unknown error has occured',
        message: 'Sorry, there is no additional information to provide'
    }
}
