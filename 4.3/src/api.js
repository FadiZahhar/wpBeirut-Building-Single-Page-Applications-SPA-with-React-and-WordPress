const baseUrl = 'https://wpmeetup-profreelancer.c9users.io/wp-json/wp/v2/';
// used for authentication url wp api the one we already installed jwt.
const authUrl = 'https://wpmeetup-profreelancer.c9users.io/wp-json/jwt-auth/v1'

export default class Api {

    posts(options = {}) {
        let url = `${baseUrl}posts`;

        if (options.id !== undefined) {
            url += `/${options.id}`;
        }

        url += '?_embed';

        if (options.category !== undefined) {
            url += `&categories=${options.category}`;
        }
        
        return fetch(url).then(res => res.json());
    }

    categories() {
        let url = `${baseUrl}categories`;

        // if (id !== undefined) {
        //     url += `/${id}`;
        // }
        
        return fetch(url).then(res => res.json());
    }

    authenticate(username, password) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(`${authUrl}/token`, {
            method: 'POST',
            headers,
            body: JSON.stringify({username, password})
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res.json();
        });
    }
}