getCollections.onclick = () => {
  let inputCity = document.getElementById("cityName");
  let city = inputCity.value;
  let container = document.querySelector(".container");
  let urls = [];

  function parse_html(htmlString) {
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(htmlString, "text/html");
    let document = htmlDoc.documentElement;
    let myImg = document.getElementsByTagName("img");

    for (let i = 1; i < myImg.length; i++) {
      urls.push(myImg.item(i).src.substring(25, 142));
    }
    return urls;
  }

  fetch(`http://localhost:3000/village?city=${city}`)
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
      console.log(parse_html(res));
      console.log(urls);
      container.innerHTML = "";

      for (let i = 0; i < urls.length; i++) {
        let newImg = document.createElement("IMG");
        newImg.setAttribute("src", urls[i].toString());
        newImg.setAttribute("alt", urls[i].toString());
        newImg.setAttribute("width", "200px");
        newImg.setAttribute("style", "display: block; margin: 10px;");
        container.appendChild(newImg);

        // let newDiv = document.createElement("DIV");
        // newDiv.setAttribute("style", `background-image: url(${urls[i].toString()}); background-size: cover; width: 200px; height: 150px; margin: 10px;`);
        // container.appendChild(newDiv);
      }
      inputCity.value = "";
    });
};
