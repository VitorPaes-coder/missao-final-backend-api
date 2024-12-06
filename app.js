/*******************************************************************************************************************************************************
 * Objetivo: API para manipular dados de cursos e alunos.
 * Data: 22/11/24
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
*******************************************************************************************************************************************************/

/**
 * Para Criar uma API devemos instalar -->
 * 
 * express        npm install  express --save            --Serve para criar a API
 * cors           npm install  cors --save               --Serve para configurar as permissões da API
 * body-parser    npm install  body-parser --save        --Serve para manipular os dados do body da API
*/

const  express = require('express');
const  cors = require('cors');
const  bodyParser = require('body-parser');

//Inicializanddo o express através do objeto app
const app = express()

//request   -->    Dados que chegam na API
//response  -->    Dados que a API envia de volta para o cliente
app.use((request,response, next)=>{
    //Permissão de acesso para liberar quais máquinas poderão usar a API
    response.header('Acess-Control-Allow-Origin',  '*');
    //Permissão de acesso para liberar os verbos da requisição da API
    response.header('Acess-Control-Allow-Methods',  'GET');

    app.use(cors())//Ativando as configurações do cors

    next()
})

const alunosCursos = require('./modulo/funcoes.js')

//Recupera uma lista de todos os cursos oferecidos pela escola. 
app.get('/v1/lion-school/lista-cursos', cors(), async function(request, response){
    let listaCursos = alunosCursos.getListaDeCursos()

    if(listaCursos){
        response.status(200) //sucess
        response.json(listaCursos)
    }else{
        response.status(404) // not found
        response.json({'status': 404, 'message':  'Não foi possível encontrar nenhum item de retorno.'})
    }
})

//Recupera uma lista de todos os alunos matriculados na escola.
app.get('/v1/lion-school/lista-alunos', cors(), async function(request, response){
    let listaAlunos = alunosCursos.getListaAlunos()

    if(listaAlunos){
        response.status(200) //sucess
        response.json(listaAlunos)
    }else{
        response.status(404) // not found
        response.json({'status': 404, 'message':  'Não foi possível encontrar nenhum item de retorno.'})
    }
})

//Recupera informações de um aluno específico com base no número de matrícula. 
app.get('/v1/lion-school/lista-alunos/:matricula', cors(), async function(request, response){
    let matriculaDados = request.query.matricula

    let alunoMatricula = alunosCursos.matriculaAluno(matriculaDados)

    if(alunoMatricula){
        response.status(200)
        response.json(alunoMatricula)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Matrícula não localizado.'})
    }
})

//Recupera uma lista de todos os alunos matriculados no curso especificado. DS ou REDES 
app.get('/v1/lion-school/alunos-matriculados/:curso', cors(), async function(request, response){
    let dados = request.params.curso

    let alunosDoCurso = alunosCursos.alunoCurso(dados)

    if(alunosDoCurso){
        response.status(200)
        response.json(alunosDoCurso)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
    }
})

//Recupera uma lista de todos os alunos com o status especificado. Finalizado ou Cursando
// app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
//     let dados = request.query.status

//     let alunosDoCurso = alunosCursos.alunoStatus(dados)

//     if(alunosDoCurso){
//         response.status(200)
//         response.json(alunosDoCurso)
//     }else{
//         response.status(404)
//         response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
//     }
// })

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
    let statusAluno = request.query.sta
    let curso = request.query.nc
    let statusDisciplinas = request.query.std
    let anoConclusao = request.query.adc
    
    let alunosDoCurso = alunosCursos.filtroLionSchool(statusAluno, curso, statusDisciplinas, anoConclusao)
    
    // console.log(alunosDoCurso);
    // console.log(statusAluno);
    // console.log(curso);
    // console.log(statusDisciplinas);
    // console.log(anoConclusao);

    if(alunosDoCurso){
        response.status(200)
        response.json(alunosDoCurso)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
    }
})

// app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
//     let dados = request.query.curso

//     let alunosDoCurso = alunosCursos.alunoCurso(dados)

//     if(alunosDoCurso){
//         response.status(200)
//         response.json(alunosDoCurso)
//     }else{
//         response.status(404)
//         response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
//     }
// })

app.listen('8080', function(){
    console.log('API aguardando requisições...');
})