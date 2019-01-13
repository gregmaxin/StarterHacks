document.addEventListener("DOMContentLoaded", event => {

    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    const app = firebase.app();
    // console.log(app);

    const db = firebase.firestore();

    // const myUser = db.collection('users').doc('Jayary0YNFS1t1gEhUgk');

    // myUser.onSnapshot(doc => {

    //     const data = doc.data();
    //     document.getElementById("display-change").innerHTML = data.phone;
    //     console.log(data.phone);

    // })

});

// function updatePhone(e) {
//     const db = firebase.firestore();
//     const myUser = db.collection('users').doc('Jayary0YNFS1t1gEhUgk');
//     myUser.update({ phone: e.target.value })
// }

function booking(ohip, appointmentTime, appointmentCategory, appointmentReason) {
    // Booking formats in the array is (strings please)
    // ohip|appointmentTime|appointmentCategory|appointmentReason
    var book = ohip + "|" + appointmentTime + "|" + appointmentCategory + "|" + appointmentReason
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    var patientRef = db.collection('users').doc(uid);

    patientRef.update({
        bookings: firebase.firestore.FieldValue.arrayUnion(book)
    })
}

function getuid() {
    const db = firebase.firestore()
    const uid = firebase.auth().currentUser.uid
    var docRef = db.collection('users').doc(uid)
    console.log(uid)
    return uid
}

function getname() {
    const db = firebase.firestore()
    const uid = firebase.auth().currentUser.uid
    var docRef = db.collection('users').doc(uid)
    docRef.get().then(function(doc) {
        const name = doc.data().name;
        console.log("Document data:", name);
        return name;
    })
}



function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user

            const db = firebase.firestore()
            const users = db.collection("users")

            db.collection('users').doc(user.uid).get()
            .then((docSnapshot) => {
                
                if (!docSnapshot.exists) {
                    db.collection('users').doc('id')
                    .onSnapshot((doc) => {
                        users.doc(user.uid).set({
                            name : user.displayName, 
                            uid : user.uid,
                            bookings : []
                        }).then(()=>{
                            console.log("done adding new user to database");

                            const db = firebase.firestore()
                            const uid = firebase.auth().currentUser.uid
                            var docRef = db.collection('users').doc(uid)

                            docRef.get().then(function(doc) {
                                document.getElementById("welcome-msg").innerHTML = "Welcome to Kidsability " +  doc.data().name;
                            })
                            // Load screen for registration (phone numbers and stuff)
                        })
                    });
                } else {
                    console.log("it exists lol")
                    const db = firebase.firestore()
                    const uid = firebase.auth().currentUser.uid
                    var docRef = db.collection('users').doc(uid)
                    docRef.get().then(function(doc) {
                        document.getElementById("welcome-msg").innerHTML = "Welcome Back " +  doc.data().name;
                    })

                    // Take them to the booking page
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}