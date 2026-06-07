document.getElementById("signIn").addEventListener("click", () => {
  const userName = document.getElementById("userName");
  const userNameValue = userName.value;
  console.log(userNameValue);

  const password = document.getElementById("password");
  const passwordValue = password.value;
  console.log(passwordValue);

  if (userNameValue == "admin" && passwordValue == "admin123") {
    alert("Sign In successful");
    window.location.assign("./home.html");
  } else {
    alert("wrong username and password");
    return;
  }
});
