function submitData() {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phoneNumber = document.getElementById("phoneNumber").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  if (name === "") {
    return alert("Name must be filled out")
  } else if (email === "") {
    return alert("Email must be filled out")
  } else if (phoneNumber === "") {
    return alert("Phone Number must be filled out")
  } else if (subject === "") {
    return alert("Subject must be filled out")
  } else if (message === "") {
    return alert("Message must be filled out")
  }

  console.log(name)
  console.log(email)
  console.log(phoneNumber)
  console.log(subject)
  console.log(message)

  let a = document.createElement('a')

  a.href = `mailto:${email}?subject=${subject}&body=${message}`;

  a.click()
}