const api = 'https://apitodoapp1.vercel.app'
const body = document.body
const createTodo = document.getElementById('createTodo')
const createTodoName = document.getElementById('createTodoName')
const createTodoDescription = document.getElementById('createTodoDescription')
const mainList = document.getElementById('main-list')
const formApi = document.getElementById('editForm')
const save = document.getElementById('saveTodo')
const editBtn = document.querySelectorAll('.btnEdit')
const kutibTurish = document.getElementById('kutibTurish')
const createBTN = document.getElementById('createBTN')
const hechnarsa = document.getElementById('hechnarsa')
const createBTNchasi = document.getElementById('createBTNchasi')

console.log('hello world`')

createBTNchasi.addEventListener('click', () => {
    createTodo.createTodoName.value = localStorage.getItem('createTodoName')
    createTodo.createTodoDescription.value = localStorage.getItem('createTodoDes')
})

createTodo.createTodoName.addEventListener('input', () => {
    localStorage.setItem('createTodoName', createTodoName.value)
})

createTodo.createTodoDescription.addEventListener('input', () => {
    localStorage.setItem('createTodoDes', createTodoDescription.value)
})

createTodo.addEventListener('submit', async (n) => {
    createBTN.disabled = true
    createBTN.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>`

    n.preventDefault()
    try {
        const data = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "todoName": createTodoName.value,
                "todoDescription": createTodoDescription.value
            })
        })

        if (!data.ok) {
            throw new Error(`createtodo da Xatolik bo'ldi serverda`)
        }

        const res = await data.json()

        if (res) {
            console.log(res)
        }
    } catch (error) {
        console.log(`Xatolu : ${error.message}`)
    }

    localStorage.removeItem('createTodoName')
    localStorage.removeItem('createTodoDes')

    window.location.reload()
})


const getData = async () => {
    try {
        const daata = await fetch(api)

        if (!daata.ok) {
            throw new Error(`Xatolik bo'ldi malumot olayotganda serverdan`)
        }

        const ress = await daata.json()

        if (ress) {
            kutibTurish.classList.add('d-none')
            if (ress.data[0] == undefined) {
                hechnarsa.classList.remove('d-none')
            }
            ress.data.forEach((n) => {
                const div = document.createElement('div')
                div.innerHTML = `
                <div class="card my-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                              <h3>${n.todoName}:</h3>
                              <div class="d-flex">
                                <button type="button" class="btn d-flex border-0 btnEdit" idchasi="${n._id}" data-bs-toggle="modal" data-bs-target="#editModal">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                        </svg>
                                        </button>
                                        <button type="button" class="btn d-flex border-0 btnRemove" id="rmv" idchasi="${n._id}"  data-bs-toggle="modal" data-bs-target="#deleteModal">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                   </svg>
                                </button>
                              </div>
                          </div>
                          <div class="card-body my-3">
                              <figure>
                              <figcaption class="blockquote-footer">
                              ${n.todoDescription}
                              </figcaption>
                              </figure>
                              </div>
                              </div>
                              `

                mainList.appendChild(div)
            })
            const editBtn1 = document.querySelectorAll('.btnEdit')

            editBtn1.forEach((n) => {
                const idsi = n.getAttribute('idchasi')
                n.addEventListener('click', () => {
                    const input = formApi.createTodoName
                    const desc = formApi.createTodoDescription
                    const plshldr = document.querySelectorAll('.ii')
                    const uu = document.querySelectorAll('.uu')
                    const pp = document.getElementById('ppp')
                    pp.classList.add('placeholder-glow')
                    uu.forEach((p) => {
                        p.classList.add('placeholder')
                    })
                    plshldr.forEach((m) => {
                        m.classList.add('placeholder-glow')
                    })
                    input.classList.add('placeholder')
                    desc.classList.add('placeholder')

                    const getDataValue = async () => {
                        try {
                            const datta = await fetch(`${api}/${idsi}`)
                            const rress = await datta.json()
                            if (rress) {
                                input.classList.remove('placeholder')
                                desc.classList.remove('placeholder')
                                plshldr.forEach((m) => {
                                    m.classList.remove('placeholder-glow')
                                })
                                uu.forEach((p) => {
                                    p.classList.remove('placeholder')
                                })
                                input.value = rress.data.todoName
                                desc.value = rress.data.todoDescription
                                console.log(rress)
                            }
                        } catch (error) {
                            console.log(`Xatolik: ${error.message}`)
                        }
                    }

                    getDataValue()

                    save.addEventListener('click', (a) => {
                        save.disabled = true
                        save.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>`
                        save.disabled = true
                        a.preventDefault()
                        console.log(a)
                        const putData = async () => {
                            try {
                                const daattaa = await fetch(`${api}/${idsi}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        "todoName": input.value,
                                        "todoDescription": desc.value
                                    })
                                })
                                const ressss = await daattaa.json()
                                if (ressss) {
                                    window.location.reload()
                                }

                            } catch (error) {
                                console.log(`Xatolik: ${error.message}`)
                            }
                        }
                        putData()

                    })

                })

            })

            const btnRemove = document.querySelectorAll('.btnRemove')
            btnRemove.forEach((n) => {
                const y = n.getAttribute('idchasi')
                n.addEventListener('click', () => {
                    const rmvv = document.getElementById('removeBtn')

                    rmvv.addEventListener('click', () => {
                        rmvv.disabled = true
                        rmvv.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>`
                        const deleteData = async () => {
                            try {
                                const dattta = await fetch(`${api}/${y}`, {
                                    method: "DELETE"
                                })

                                const rrss = await dattta.json()
                                if (rrss) {
                                    window.location.reload()
                                }
                            } catch (error) {
                                console.log(`Xatolik: ${error.message}`)
                            }
                        }

                        deleteData()
                    })
                })
            })
        }
    } catch (error) {
        console.log(`Xatolik: ${error.message}`)
    }
}

getData()


