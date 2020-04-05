import { createHttpLink } from 'apollo-link-http';
import config from '../../config';


class UserApi {
    static updateUserProfile(
        _id: string,
        email: string,
        firstName: string,
        lastName: string,
        username: string,
        bio: string,
        link: string
    ) {
        const query = `mutation
        { 
            userUpdateById(record: 
                {
                    _id: "5c755cec4eb80249186a90ef",
                    last: "${firstName}",
                    first: "${lastName}",
                    username: "${username}",
                    email: "${email}",
                    bio: "${bio}",
                    link: "${link}",
                }
            ){
                record {
                    _id,
                    first,
                    last,
                    email, 
                    username,
                    bio, 
                    link,
                }
            }
        }`;

        console.log(query);

        return fetch(`http://192.168.1.42:1140/graphql`, {
            method: 'POST',
            body: JSON.stringify({ query: query }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }
}

export default UserApi;
