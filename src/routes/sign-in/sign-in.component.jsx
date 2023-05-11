import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const SingIn = () =>{

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h1> Sign In Page</h1>
            <button onClick={logGoogleUser}>Sing in With Google Popup</button>
        </div>
    );
}

export default SingIn;