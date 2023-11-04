let data = [
  {
    img: "",
    username: "jd3n"
  },
  {
    img: "",
    username: "hack3r"
  },
  {
    img: "",
    username: "floyd_76"
  },
  {
    img: "",
    username: "big_harry"
  },
  {
    img: "",
    username: "for3ign"
  },
  {
    img: "",
    username: "giggles"
  },
  {
    img: "",
    username: "neo-vim"
  },
  {
    img: "",
    username: "michaelsmith33"
  },
  {
    img: "",
    username: "jane_doe"
  },
  {
    img: "",
    username: "maryS-01"
  }
]

let head = document.createElement("template")
head.innerHTML = `
  <style>
    @import url("./index.css");
  </style>
  <section class="container">
    <h3 class="subhead">Suggested for you</h3>
    <div class="users">
      ${data.map((datum) => User(datum.username)).join("")}
    </div>
  </section>
`

function Modal() {
  return `
    <button type="button" class="modal">Dismiss user</button>
  `
}

function User(username) {
  return `
    <article class="user" data-open="false">
      <picture></picture>
      <div>
        <h4>${username}</h4>
        <p>Suggested for you</p>
      </div>
      <div>
        <button class="follow">Follow</button>
        <button class="option">:</button>
        ${Modal()}
      </div>
    </article>
  `
}

class Suggestions extends HTMLElement {
  constructor() {
    super()
    let shadow = this.attachShadow({mode: "open"})
    shadow.append(head.content.cloneNode(true))
  }

  connectedCallback() {
    let parent = this.shadowRoot
    let followBtns = parent.querySelectorAll('.follow')
    let optionBtns = parent.querySelectorAll(".option")

    followBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.target.innerHTML = "Following"
        e.target.style.backgroundColor = "var(--gray)"
      })
    })

    parent.addEventListener("click", e => {
      if (e.target.classList.contains("option")) {
        if (e.target.parentElement.parentElement.dataset.open == "false") {
          e.target.nextElementSibling.style.display = "block"
          e.target.parentElement.parentElement.dataset.open = "true"
        } else {
          e.target.nextElementSibling.style.display = "none"
          e.target.parentElement.parentElement.dataset.open = "false"
        }
      } else if (e.target.classList.contains("modal")) {
        e.target.parentElement.parentElement.style.display = "none"
      } else {
        return
      }
    })

  }

}

customElements.define("suggestions-", Suggestions)
