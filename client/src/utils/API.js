import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // Search google books for the title
  searchGoogle: function(title) {
    const baseURL = "https://www.googleapis.com/books/v1/volumes";
    const query = "?q=intitle:" + title + "&printType=books&maxResults=5";
    return axios.get(baseURL + query).then(res => {
      console.log("initial res from google is:", res);
      let tempArray = [];
      const base = res.data.items;
      for (let i = 0; i < res.data.items.length; i++) {
        let tempObj = {};
        tempObj["index"] = i;
        tempObj["title"] = base[i].volumeInfo.title;
        tempObj["synopsis"] = base[i].volumeInfo.description;
        tempObj["author"] = base[i].volumeInfo.authors;
        tempObj["selfLink"] = base[i].selfLink;
        tempObj["thumbnail"] =
          res.data.items[i].volumeInfo.imageLinks.thumbnail;
        console.log("tempObj.title is:", tempObj.title);
        console.log("tempObj.synopsis is:", tempObj.synopsis);
        console.log("tempObj.author is:", tempObj.author);
        if (
          !(
            tempObj.title === undefined ||
            tempObj.synopsis === undefined ||
            tempObj.author === undefined
          )
        ) {
          console.log("i got here!");
          tempArray.push(tempObj);
        }
      }
      console.log(tempArray);
      return tempArray;
    });
  }
};
