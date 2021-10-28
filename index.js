window.onload = () => {
  const dateBox = document.querySelector(".date");
  const date = new Date();
  const day = date.getDate();
  console.log(day);
  let month = date.getMonth();
  month+=1;
  console.log(month);
  const year = date.getFullYear();
  console.log(year);

  dateBox.innerHTML =
    "Date : <span>" + day + "-" + month + "-" + year + "</span>";

  const formTodo = document.querySelector(".formTodo");
  let list = document.querySelector(".list");

  if (JSON.parse(localStorage.getItem("todoItems")) !== null) {
    JSON.parse(localStorage.getItem("todoItems")).map((todo) => {
      const div = document.createElement("div");
      div.className = "item";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "itemCheck";
      input.id = todo.id;
      const p = document.createElement("p");
      p.innerHTML = todo.name;
      div.append(input);
      div.append(p);
      list.append(div);
    });
  }

  const inputs = document.querySelectorAll('input[name="itemCheck"]');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click", function (e) {
      if (JSON.parse(localStorage.getItem("todoItems")) !== null) {
        let itemsLocal = [];
        JSON.parse(localStorage.getItem("todoItems")).map((todo) => {
          if (todo.id != e.target.id) {
            itemsLocal.push(todo);
          }
        });
        localStorage.setItem("todoItems", JSON.stringify(itemsLocal));
        window.location.reload();
        alert("Good Job!!!");
      }
    });
  }
  formTodo.onsubmit = function (e) {
    e.preventDefault();
    const value = e.target.name.value;
    let items = [];
    let id = Id();
    function Id() {
      if (
        JSON.parse(localStorage.getItem("todoItems")) === null ||
        JSON.parse(localStorage.getItem("todoItems")).length == 0
      ) {
        return 1;
      } else {
        console.log(JSON.parse(localStorage.getItem("todoItems")).length - 1);
        return (
          JSON.parse(localStorage.getItem("todoItems"))[
            JSON.parse(localStorage.getItem("todoItems")).length - 1
          ].id + 1
        );
      }
    }
    let item = {
      id: id,
      name: value,
      date: day + "-" + month + "-" + year,
    };

    console.log(item);

    if (value == "") {
      alert("please fill the text here!!");
    } else {
      if (JSON.parse(localStorage.getItem("todoItems")) === null) {
        items.push(item);
        localStorage.setItem("todoItems", JSON.stringify(items));
        window.location.reload();

        alert("item is added");
      } else {
        JSON.parse(localStorage.getItem("todoItems")).map((todo) => {
          items.push(todo);
        });
        items.push(item);
        localStorage.setItem("todoItems", JSON.stringify(items));
        window.location.reload();
        alert("item is added");
      }
    }
  };
};
