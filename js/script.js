// Get user to second stage
function hideWelcome() {
    var welcomeButton = document.getElementById("welcomeDiv");
    var parentDiv = document.getElementById("parentDiv");
    var input = document.getElementById("input");
    var welcomeMsg = document.getElementById("welcomeMsg");
    if (isNaN(input.value) && input.value !== null && input.value.length >= 3) {
        welcomeButton.style.display = "none";
        parentDiv.style.display = "block";
        welcomeMsg.innerHTML = "Welcome, " + input.value + "!";
    } else {
        alert("Write a valid name!");
        input.value = "";
    }
}

document.getElementById("mainForm").addEventListener('submit', saveBookmark);

// Main Function
function saveBookmark(e) {
    
    e.preventDefault();
    
    var siteTitle = document.getElementById("title").value;
    var siteURL = document.getElementById("url").value;
    var siteDesc = document.getElementById("desc").value;
    
    if (!validation(siteTitle, siteURL, siteDesc)) {
        return false;
    }
    
    var bookmark = {
        title: siteTitle,
        url: siteURL,
        desc: siteDesc
    };
    
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    document.getElementById("mainForm").reset();
    
    getBookmarks();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
            bookmarks.splice(i,1);
        }
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    getBookmarks();
}

function getBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkWindow = document.getElementById("bookmarkWindow");
    bookmarkWindow.innerHTML = "<h2>Your bookmark List</h2>";
    for (var i = 0; i < bookmarks.length; i++) {
        var title = bookmarks[i].title;
        var url = bookmarks[i].url;
        var desc = bookmarks[i].desc;
        
        bookmarkWindow.innerHTML += '<div style="width:300px; border:2px solid red;padding:15px;">' +
                                    '<h3>'+'Title: '+title+'</h3>'+
                                    '<h3>'+'URL: ' + '<a target="_blank" href="'+url+'">Visit</a>'+'</h3>'+
                                    '<h3>'+'Description: '+desc+
                                    '</h3>'+'<button onclick="deleteBookmark(\''+url+'\');">Delete</button>'
                                    '</div>';
    }
}

function validation(siteTitle, siteURL, siteDesc) {
    if (!siteTitle || !siteURL || !siteDesc) {
        alert("Please, fill in all the required data.");
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if (!siteURL.match(regex)) {
        alert("Enter a valid URL");
        return false;
    }
    
    return true;
}