console.log(firebase);

// d10 is object that will become a document once stored on firestore

let d10 = {
  r_id: "d10",
  r_name: "nonas kitchen",
  l_code: 13,
  city: "london",
  country: "uk",
  style: ["american", "chinese", "italian"],
};

// show all cuisine styles for d10
console.log(d10.style);

// add famous dish
d10.famous_dish = "pizza";

console.log(d10);

// d13 is another object that will turn into a document
let d13 = {
  r_id: "d13",
  r_name: "test restaurant",
  l_code: 15,
  city: "madison",
  state: "wi",
  country: "USA",
  style: ["italian"],
  nose_leveL: "low",
};

// store the objects into firestore

// add() or set()

// choose a collection before adding the document into the collection

// db.collection("restaurants").add(d10);
// db.collection("restaurants").add(d13);

let r10 = {
  name: "random restaurant",
  location_code: 13,

  address: {
    city: "chicago",
    zip: "62220",
    country: "usa",
  },
};

let r11 = {
  name: "new restaurant",
  location_code: 13,

  address: {
    city: "chicago",
    zip: "62220",
    country: "usa",
  },
};

db.collection("restaurants").doc("abc123").set(r10);
db.collection("restaurants").doc("def123").set(r11);

let l_c_13 = {
  code: 13,
  address: {
    zip: 62220,
    city: "chicago",
    country: "usa",
  },
};

let l_c_14 = {
  code: 14,
  address: {
    zip: 53719,
    city: "madison",
    country: "usa",
  },
};

db.collection("locations").doc("13").set(l_c_13);
db.collection("locations").doc("14").set(l_c_14);

let r100 = {
  name: "one more test r",
  location_code: 13,
};

db.collection("restaurants").add(r100);

db.collection("restaurants")
  .doc("tasty-bites")
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Restaurant Data:", doc.data());
    } else {
      console.log("No such restaurant!");
    }
  });

db.collection("restaurants")
  .doc("tasty-bites")
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Restaurant Data:", doc.data());

      // Fetch reviews separately
      db.collection("reviews")
        .where("restaurantID", "==", "tasty-bites")
        .get()
        .then((querySnapshot) => {
          let reviews = [];
          querySnapshot.forEach((reviewDoc) => {
            reviews.push(reviewDoc.data());
          });
          console.log("Reviews:", reviews);
        });
    }
  });
