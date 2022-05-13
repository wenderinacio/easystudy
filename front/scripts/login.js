function abrirCadastro() {
    document.getElementById('signup').style.display = 'block'
}

function logar(){
    const btnLogar = document.getElementById('btnLogar')
    btnLogar.addEventListener('click', ()=>{
        window.location.href = '../pages/areaDoAluno.html'
    })
}

logar()