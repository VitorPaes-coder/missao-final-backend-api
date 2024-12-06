/*******************************************************************************************************************************************************
 * Objetivo: Criar uma aplicação Back-End para monitorar dados dos alunos da escola Lion.
 * Data: 22/11/24
 * Autor: Vitor Paes
 * Versão: 1.0
*******************************************************************************************************************************************************/
var cursoss = require('./cursos.js')
var alunoss = require('./alunos.js')
var listaCursos = cursoss.cursos
var listaAlunos = alunoss.alunos


//var listaEstados = lista.listaDeEstados.estados


/*****************************************************************************************
 *Criar uma função que retorna a lista de todos os cursos registrados.
 *****************************************************************************************/
const getListaDeCursos = function(){
    let retorno = {quantidade: 0, curso: []}
    let quantidade = 0
    
    listaCursos.forEach(function(item){
        retorno.curso.push(item)
        quantidade++
    })
    retorno.quantidade = quantidade

    if(quantidade > 1){
            return retorno
    }else{
        return false
    } 
}
//console.log(getListaDeCursos())

/*****************************************************************************************
 *Criar uma função que retorna a lista de todos os alunos matriculados.
 *****************************************************************************************/
const getListaAlunos = function(){
    let retorno = {quantidade: 0, alunos: []}
    let quantidade = 0
    
    listaAlunos.forEach(function(item){
        retorno.alunos.push(item)
        quantidade++
    })
    retorno.quantidade = quantidade

    if(quantidade > 1){
            return retorno
    }else{
        return false
    } 
}
//console.log(getListaAlunos())

/**********************************************************************************************
 *Criar uma função que retorna um aluno específico, onde a matrícula será o critério de filtro. 
 *********************************************************************************************/
const matriculaAluno = function(valor){
    let matricula = valor
    let informar =  {aluno: []}

    listaAlunos.forEach(function(item){
        if(item.matricula == matricula){
            informar.aluno.push(item)
        }
    })
    if(matricula == ''){
        return false
    }else{
        return  informar
    }
}
//console.log(matriculaAluno('20151001019'));


/**************************************************************************
*Criar uma função que lista todos alunos matriculados no curso especificado.
**************************************************************************/
const alunoCurso = function(nome){
    let curso = String(nome.toUpperCase())
    let  informar = {curso: curso, alunos: []}

    listaAlunos.forEach(function(item){
        item.curso.forEach(function(nomeCurso){

            if(nomeCurso.sigla == curso){
                informar.alunos.push(item)
            }
        })
    })
    if(curso == '' || informar.alunos.length < 1){
        return false
    }else{
        return  informar
    }
}
//console.log(alunoCurso('ds'));

/*************************************************************************************
*Criar uma função que lista todos alunos com o status de 'Cursando' ou 'Finalizado'.
*************************************************************************************/
const alunoStatus = function(situacao){
    let status = situacao
    let informar = {status: status, alunos: []}

    listaAlunos.forEach(function(item){
        if (item.status == status){ 
            informar.alunos.push(item)
        }
    })

    if (status === '' || informar.alunos.length < 1){
        return false
    } else {
        return informar
    }
}

//console.log(alunoStatus('Finalizado'))

/**********************************************************************************************************************
*Criar uma função que lista todos alunos matriculados no curso especificado e com base em um status de uma disciplina.*
**********************************************************************************************************************/
const disciplinaStatus = function(nomeCurso, situacao){
    let curso = String(nomeCurso.toUpperCase())
    let status = situacao
    let  informar = {curso: curso, status: status, alunos: []}

    listaAlunos.forEach(function(item){

        item.curso.forEach(function(cursoNome){

            if(cursoNome.sigla == curso){
                let statusDisciplinas = []
                
                cursoNome.disciplinas.forEach(function(disciplinaCurso){
                    if(disciplinaCurso.status == status){
                        statusDisciplinas.push(disciplinaCurso)
                    }
                })
                if (statusDisciplinas.length > 0) {
                    informar.alunos.push(item)
                }
            }
        })
    })
    if(curso == '' || status == '' || informar.alunos.length < 1){
        return false
    }else{
         return  informar
    }
}
//console.log(disciplinaStatus('DS', 'Exame'));


/**************************************************************************************************************
*Criar uma função que lista todos alunos matriculados em um curso especificado e com base no ano de conclusão.*
**************************************************************************************************************/
const cursoAnoConclusao = function(nomeCurso, data){
    let curso = String(nomeCurso.toUpperCase())
    let anoConclusao = data
    let  informar = {curso: curso, anoDeConclusao: anoConclusao, alunos: []}

    listaAlunos.forEach(function(item){

        item.curso.forEach(function(cursoEscolhido){

            if(cursoEscolhido.sigla == curso && cursoEscolhido.conclusao == anoConclusao){
                informar.alunos.push(item)
            }
        })
    })

    if(curso == '' || anoConclusao == ''){
        return false
    }else if(informar.alunos.length < 1){
        console.log('Nenhum aluno se formou no ano inserido.');
        return false
    }else{
        return  informar
    }
}
//console.log(cursoAnoConclusao('ds', '2023'))

function filtroLionSchool(statusA, nCurso, statusD, anoC) {
    let statusAluno = statusA
    let curso = nCurso
    let statusDisciplinas = statusD
    let anoConclusao = anoC
    let informar = false

    if(statusAluno){
        informar = alunoStatus(statusAluno)
    }else if(curso && statusDisciplinas && !anoConclusao){
        informar = disciplinaStatus(curso, statusDisciplinas)
    }else if(curso && anoConclusao && !statusDisciplinas){
        informar = cursoAnoConclusao(curso, anoConclusao)
    }
    return informar
}

module.exports = {
    getListaDeCursos,
    getListaAlunos,
    matriculaAluno,
    alunoCurso,
    alunoStatus,
    disciplinaStatus,
    cursoAnoConclusao,
    filtroLionSchool
}