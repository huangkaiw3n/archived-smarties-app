import * as Firebase from 'firebase'

let HAS_INITIALIZED = false

const initFirebase = () => {
    if (!HAS_INITIALIZED) {
        const config = {
            apiKey: "AIzaSyBzClvv2oiYFWRv1AbpwXz_KK84WiOLA-s",
            authDomain: "parkpark-334b8.firebaseapp.com",
            databaseURL: "https://parkpark-334b8.firebaseio.com",
            storageBucket: "",
        };

        Firebase.database.enableLogging(true)
        Firebase.initializeApp(config)
        HAS_INITIALIZED = true
    }
}

export const getDatabase = () => {
    initFirebase()
    return Firebase.database()
}
