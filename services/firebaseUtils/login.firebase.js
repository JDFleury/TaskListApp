import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
export const loginWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return "async test"
        })
        .catch((error) => {
            console.log(error);
            return {
                loggedIn: false,
                errorMessage: "Wrong Email Or Password"
            }
        })
}