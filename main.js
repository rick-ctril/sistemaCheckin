

let participantes = [
    {
        nome: "Sarinha Sapão",
        email: "sarahsapo@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 22, 11),
        dataCheckIn: null
    },
    {
        nome: "Luiz Henrique",
        email: "perluizhenrique@gmail.com",
        dataInscricao: new Date(2024, 4, 1, 22, 30),
        dataCheckIn: new Date(2024, 4, 1, 22, 50)
    },
    // Coloque os demais participantes aqui
    {
        nome: "João Silva",
        email: "joaosilva@gmail.com",
        dataInscricao: new Date(2024, 3, 15, 18, 0),
        dataCheckIn: null
    },
    {
        nome: "Maria Souza",
        email: "mariasouza@gmail.com",
        dataInscricao: new Date(2024, 3, 20, 12, 0),
        dataCheckIn: null
    },
    {
        nome: "Carlos Oliveira",
        email: "carlosoliveira@gmail.com",
        dataInscricao: new Date(2024, 2, 29, 16, 0),
        dataCheckIn: new Date(2024, 3, 1, 8, 30)
    },
    {
        nome: "Ana Santos",
        email: "anasantos@gmail.com",
        dataInscricao: new Date(2024, 3, 5, 20, 0),
        dataCheckIn: new Date(2024, 3, 5, 20, 15)
    },
    {
        nome: "Pedro Costa",
        email: "pedrocosta@gmail.com",
        dataInscricao: new Date(2024, 3, 10, 14, 0),
        dataCheckIn: new Date(2024, 3, 10, 14, 20)
    },
    {
        nome: "Luisa Fernandes",
        email: "luisafernandes@gmail.com",
        dataInscricao: new Date(2024, 3, 25, 9, 0),
        dataCheckIn: new Date(2024, 3, 25, 9, 45)
    },
    {
        nome: "Rafaela Marques",
        email: "rafaelamarques@gmail.com",
        dataInscricao: new Date(2024, 3, 28, 17, 0),
        dataCheckIn: new Date(2024, 3, 28, 17, 20)
    },
    {
        nome: "Fernando Almeida",
        email: "fernandoalmeida@gmail.com",
        dataInscricao: new Date(2024, 2, 18, 10, 0),
        dataCheckIn: new Date(2024, 2, 19, 11, 30)
    }
];




const criarNovoParticipante = (participante) => {
   const dataInscricao = dayjs(Date.now())
   .to(participante.dataInscricao)

   let dataCheckIn = dayjs(Date.now())
   .to(participante.dataCheckIn)

   if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `
   }
   
    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
            ${participante.email}
            </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
     // estrutura de repetição - loop
     for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
     }

     // substituir informação do HTML
    document.querySelector('tbody').innerHTML = output

} 

atualizarLista(participantes)


const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) =>  p.email == participante.email
    )

    if(participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(mensagemConfirmacao) == false) {
        return
    }

    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}