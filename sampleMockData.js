const mockPatient = {
    id: 2,
    isStaff: false,
    name: {
      first: "John",
      middle: "Elliott",
      last: "Wayne"
    },
    address: {
      street: "17 Fanshawe Street",
      suburb: "Auckland CBD",
      city: "Auckland",
      post: "1010"
    },
    bloodType: "B",
    birthDate: "22/7/1999",
    weight: 82.5,
    height: 183,
    allergies: ["Chicken", "Egg", "School"],
    staffNotes: [
      {
        staffId: 1,
        staffOnly: false,
        timestamp: Date.now(),
        date: dateUtility.getFormattedDateNow(),
        day: dateUtility.getFormattedDayNow(),
        note: "This patient is dangerously handsome."
      },
      {
        staffId: 1,
        staffOnly: true,
        timestamp: Date.now(),
        date: dateUtility.getFormattedDateNow(),
        day: dateUtility.getFormattedDayNow(),
        note: "Just kidding. He's actually not handsome. Psssh. Only staff can see this by the way. :)"
      }
    ],
    medicalResults: [
      {
        staffId: 1,
        timestamp: Date.now(),
        date: dateUtility.getFormattedDateNow(),
        day: dateUtility.getFormattedDayNow(),
        result: "Your blood tests have come back. The result is you a dangerously handsome."
      }
    ]
  }

  const mockStaff1 = {
    id: 2,
    isStaff: true,
    title: "Dr.",
    name: {
      first: "Bruce",
      middle: "Jonathan",
      last: "Willis"
    },
    about: "Graduate of Fake University with a BS in Medicine and graduated from Fake medical school in 2016."
      + "\n\nMy passion is providing fake medical care to my patients. In my spare time, I have to spend time "
      + "with my fake family and going on hikers around the fake woods.",
    messages: [
      {
        sentBy: 2,
        sentTo: 3,
        timestamp: Date.now(),
        message: "Hello there Samantha."
      },
      {
        sentBy: 3,
        sentTo: 2,
        timestamp: Date.now() + 2,
        message: "Hi Bruce, What's going on?"
      }
    ]
  }

  const mockStaff2 = {
    id: 3,
    isStaff: true,
    title: "Dr.",
    name: {
      first: "Samantha",
      middle: "",
      last: "Johansson"
    },
    about: "Graduate of Fake University with a BS in Medicine and graduated from Fake medical school in 2016."
      + "\n\nMy passion is providing fake medical care to my patients. In my spare time, I have to spend time "
      + "with my fake family and going on hikers around the fake woods.",
    messages: [
      {
        sentBy: 2,
        sentTo: 3,
        timestamp: Date.now(),
        message: "Hello there Samantha."

      },
      {
        sentBy: 3,
        sentTo: 2,
        timestamp: Date.now() + 2,
        message: "Hi Bruce, What's going on?"
      }
    ]
  }