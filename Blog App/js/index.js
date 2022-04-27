// Firebase Config Data
const firebaseConfig = {
  apiKey: "AIzaSyAm6xJ20aobojG3FyQRB1nilwFOeTXm6mA",
  authDomain: "blogapp-1b310.firebaseapp.com",
  databaseURL: "https://blogapp-1b310-default-rtdb.firebaseio.com",
  projectId: "blogapp-1b310",
  storageBucket: "blogapp-1b310.appspot.com",
  messagingSenderId: "313038588308",
  appId: "1:313038588308:web:603b84a3f36497edc72781",
  measurementId: "G-72J700CMN3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Persistance
firebase.auth.Auth.Persistence.LOCAL;

// Login Logic
$("#btn-login").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();

  if (email != "" && password != "") {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);

    result.catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("Message : " + errorMessage);
    });
  } else {
    window.alert("Form is incomplete. Please fill out all fields.");
  }
});

// Sign Up Logic
$("#btn-signup").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();
  var cPassword = $("#confirmPassword").val();

  if (email != "" && password != "" && cPassword != "") {
    if (password == cPassword) {
      var result = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      result.catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      });
    } else {
      window.alert("Password do not match with the Confirm Password.");
    }
  } else {
    window.alert("Form is incomplete. Please fill out all fields.");
  }
});

// Reset Password Logic
$("#btn-resetPassword").click(function () {
  var auth = firebase.auth();
  var email = $("#email").val();

  if (email != "") {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        window.alert("Email has been sent to you, Please check and verify.");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        onsole.log(errorMessage);

        window.alert("Message : " + errorMessage);
      });
  } else {
    window.alert("Please write your email first.");
  }
});

// Logout Logic
$("#btn-logout").click(function () {
  firebase.auth().signOut();
});

// Update Account Info Logic
$("#btn-update").click(function () {
  var phone = $("#phone").val();
  var address = $("#address").val();
  var bio = $("#bio").val();
  var fName = $("#firstName").val();
  var sName = $("#secondName").val();
  var country = $("#country").val();
  var gender = $("#gender").val();

  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if (
    fName != "" &&
    sName != "" &&
    phone != "" &&
    country != "" &&
    gender != "" &&
    bio != "" &&
    address != ""
  ) {
    var userData = {
      phone: phone,
      address: address,
      bio: bio,
      firstName: fName,
      secondName: sName,
      country: country,
      gender: gender,
    };

    usersRef.set(userData, function (error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        onsole.log(errorMessage);

        window.alert("Message : " + errorMessage);
      } else {
        window.location.href = "MainPage.html";
      }
    });
  } else {
    window.alert("Form is incomplete. Please fill out all fields.");
  }
});

function switchView(view) {
  $.get({
    url: view,
    cache: false,
  }).then(function (data) {
    $("#container").html(data);
  });
}
