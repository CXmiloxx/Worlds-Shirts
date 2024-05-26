import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Google() {
    const cookies = new Cookies()
    return (
        <div>
            <GoogleOAuthProvider clientId="160383558845-chnstlj0n1ggl0a6l1lt2t640e27tkpd.apps.googleusercontent.com">

            <GoogleLogin
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);

                        cookies.set('email', decoded.email, {
                            secure: true,
                            sameSite: 'None',
                            path: '/'
                        });

                        cookies.set('nombres', decoded.name, {
                            secure: true,
                            sameSite: 'None',
                            path: '/'
                        });

                        if (decoded.picture) {
                            cookies.set('imageUrl', decoded.picture, {
                                secure: true,
                                sameSite: 'None',
                                path: '/'
                            });
                        }

                        window.location.hash = '/iniciada';
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>

        </div>
    )
}

export default Google