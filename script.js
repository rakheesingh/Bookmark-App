const closeFormEl = document.querySelector("#close-form");
const bookmarkFormEl = document.querySelector("#bookmark-form");
const modal = document.querySelector("#modal");
const addBookButtonEl = document.querySelector("#addbookmark-button");
const bookmarkContainer = document.querySelector("#bookmark-container");
let BookmarkList = [];

let websiteName = "";
let websiteUrl = "";

function toggleForm() {
  modal.classList.toggle("show-modal");
}

function removeBookmark(listEl) {
  bookmarkContainer.removeChild(listEl);
}

function validateForm() {
  const regularExp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(regularExp);

  if (!websiteUrl || !websiteName) {
    alert("Please enter the form completely");
    return false;
  }

  if (!websiteUrl.match(regex)) {
    alert("Please Enter a correct URL");
    return false;
  }
  return true;
}

//Remove bookmak on click
function deleteBookmark(url)
{
  console.log(url);
  BookmarkList.forEach((bookmark, i) =>
  {
      if(bookmark.url===url)
       BookmarkList.splice(i,1);
  });
  localStorage.setItem("bookmarks", JSON.stringify(BookmarkList));
  addBookmark(BookmarkList);
}

function addBookmark(bookList) {
    //remove all the bookmarks from container
    bookmarkContainer.textContent="";

    //show bookmarks on page
    bookList.forEach((bookmark) => {
     const { name, url}= bookmark;
     const listEl = document.createElement("li");
     const imageEl = document.createElement("img");
     const anchoreEl = document.createElement("a");
     const bookmarkTitleContainerEl = document.createElement("div");
     const removeBookmarkEl = document.createElement("i");
     anchoreEl.textContent = name;
     anchoreEl.setAttribute("href", url);
     anchoreEl.setAttribute("target", "_blank");
   
     bookmarkTitleContainerEl.classList.add("name");
     removeBookmarkEl.classList.add("fas", "fa-times");
     removeBookmarkEl.setAttribute("onclick", `deleteBookmark("${url}")`);
     imageEl.setAttribute("src", `https://s2.googleusercontent.com/s2/favicon?domain=${url}`);
   
     bookmarkTitleContainerEl.append(imageEl,anchoreEl);
     listEl.append(removeBookmarkEl, bookmarkTitleContainerEl);
     bookmarkContainer.appendChild(listEl);
    });
 }

function fetchBookMark()
{
    if(localStorage.getItem("bookmarks")){
        BookmarkList=JSON.parse(localStorage.getItem("bookmarks"));
    }
    addBookmark(BookmarkList);
}

function submitBookmarkForm(e) {
  e.preventDefault();
  websiteName = e.srcElement[0].value;
  websiteUrl = e.srcElement[1].value;
  if (!websiteUrl.includes("https://") || !websiteUrl.includes("http://"))
    websiteUrl = `https://${websiteUrl}`;
  if (validateForm()) {
    const bookmark={
        name: websiteName,
        url: websiteUrl,
    }
    BookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(BookmarkList));
    toggleForm();
    fetchBookMark();
    bookmarkFormEl.reset();
  }
}

//Event for bookmark
bookmarkFormEl.addEventListener("submit", submitBookmarkForm);
addBookButtonEl.addEventListener("click", toggleForm);
closeFormEl.addEventListener("click", toggleForm);

//On load fetch bookmarks
fetchBookMark();

