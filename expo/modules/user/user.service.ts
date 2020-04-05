import { ThunkDispatch } from 'redux-thunk';
import * as UserReducer from '../user/user.reducer';
import UserApi from '../user/user.api';
import { UserActionTypes } from '../user/types/actions';
import { ErrorsActionTypes } from '../errors/types/actions';
import * as ErrorReducer from '../errors/error.reducer';

export const profileUpdate = profile => async (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | UserActionTypes>
) => {
    const { id, email, name, username, bio, link } = profile;
    const lastName = name.split(' ').slice(0, -1).join(' ');
    const firstName = name.split(' ').slice(-1).join(' ');
    await UserApi.updateUserProfile(id, email, firstName, lastName, username, bio, link)
        .then(response => {
            if (response.data) {
                const { record } = response.data.userUpdateById;
                console.log(response);
                dispatch(
                    UserReducer.setUserDetails(
                        record._id,
                        record.email,
                        record.first,
                        record.last,
                        record.username,
                        record.bio,
                        record.link
                    )
                );
            } else {
                console.log('Error: ', response);
            }
        })
        .catch(error => {
            dispatch(ErrorReducer.asyncError(error));
        });
};
