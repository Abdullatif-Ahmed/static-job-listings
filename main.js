let itemsContainer = document.querySelector(".items-container");
async function fetchData() {
  let request = await fetch("data.json");
  let data = await request.json();
  console.log(data);
  data.forEach((obj) => {
    let item = document.createElement("div");
    item.className = "item";
    if (obj.role.length > 0) {
      item.setAttribute("data-role", obj.role);
    }
    if (obj.level.length > 0) {
      item.setAttribute("data-level", obj.level);
    }
    if (obj.languages.length > 0) {
      item.setAttribute("data-languages", obj.languages.join());
    }
    if (obj.tools.length > 0) {
      item.setAttribute("data-tools", obj.tools.join());
    }

    item.innerHTML = `
    <div class="item-start" >
      <div class="img-container">
        <img src="${obj.logo}" alt="" />
      </div>
      <div class="item-details">
        <div class="item-details-heading">
          <span class="company">${obj.company}</span>
          ${obj.new === true ? `<span class="new">new!</span>` : ""}
          ${
            obj.featured === true
              ? `<span class="featured">featured</span> `
              : ""
          }
        </div>
        <a href="#"><h2 class="position">${obj.position}</h2></a>
        <div class="item-detials-bottom">
          <span class="postedAt">${obj.postedAt}</span>
          <span class="contract">${obj.contract}</span>
          <span class="location">${obj.location}</span>
        </div>
      </div>
    </div>
    `;
    let itemEnd = document.createElement("div");
    itemEnd.className = "item-end";
    let categories = document.createElement("ul");
    categories.className = "categories";
    itemEnd.appendChild(categories);
    let role = document.createElement("li");
    role.className = "categori";
    role.appendChild(document.createTextNode(obj.role));
    let level = document.createElement("li");
    level.className = "categori";
    level.appendChild(document.createTextNode(obj.level));
    categories.appendChild(role);
    categories.appendChild(level);
    obj.languages.forEach((el) => {
      let li = document.createElement("li");
      li.className = "categori";
      li.appendChild(document.createTextNode(el));
      categories.appendChild(li);
    });
    obj.tools.forEach((el) => {
      let li = document.createElement("li");
      li.className = "categori";
      li.appendChild(document.createTextNode(el));
      categories.appendChild(li);
    });
    item.appendChild(itemEnd);
    if (obj.featured === true) {
      item.classList.add("featured-item");
    }
    itemsContainer.appendChild(item);
  });
}
fetchData();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("categori")) {
    if (!document.querySelector(".search-cargori-con")) {
      let container = document.createElement("div");
      container.className = "container";
      let searchCategoriCon = document.createElement("div");
      searchCategoriCon.className = "search-cargori-con";
      let choosenCategories = document.createElement("div");
      choosenCategories.classList.add("choosen-categories");

      let searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.id = "search-input";
      let focusAttripue = document.createAttribute("autofocus");
      searchInput.setAttributeNode(focusAttripue);
      let clear = document.createElement("button");
      clear.id = "clear";
      clear.appendChild(document.createTextNode("Clear"));
      clear.onclick = function (e) {
        e.preventDefault;
        document.querySelectorAll(".choosen-categories span").forEach((el) => {
          el.remove();
        });
        stateCange();
      };
      searchCategoriCon.appendChild(choosenCategories);
      searchCategoriCon.appendChild(searchInput);
      searchCategoriCon.appendChild(clear);
      container.appendChild(searchCategoriCon);
      document.querySelector("header").appendChild(container);
      searchInput.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          search(e.target.value.trim());
        }
      });
    }
  }
});
function search(e) {
  if (e.length > 0) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(e));
    span.setAttribute("data-value", e);
    let remove = document.createElement("button");
    let img = document.createElement("img");
    img.src = "images/icon-remove.svg";
    remove.appendChild(img);
    remove.onclick = function () {
      span.remove();
      stateCange();
    };
    span.appendChild(remove);
    document.querySelector(".choosen-categories").appendChild(span);
    document.querySelector("#search-input").value = "";
    stateCange();
  }
}
function stateCange() {
  document.querySelectorAll(".item").forEach((item) => {
    item.classList.add("hidden");
    let done = 0;
    document.querySelectorAll(".choosen-categories span").forEach((span) => {
      if (item.dataset.role) {
        if (item.dataset.role === span.dataset.value) {
          done += 1;
        }
      }

      if (item.dataset.level) {
        if (item.dataset.level === span.dataset.value) {
          done += 1;
        }
      }
      if (item.dataset.languages) {
        item.dataset.languages.split(",").forEach((e) => {
          if (e === span.dataset.value) {
            done += 1;
          }
        });
      }
      if (item.dataset.tools) {
        item.dataset.tools.split(",").forEach((e) => {
          if (e === span.dataset.value) {
            done += 1;
          }
        });
      }
    });
    if (done === document.querySelectorAll(".choosen-categories span").length) {
      item.classList.remove("hidden");
    }
  });
}
