var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :QuizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function( req, res){

	if(req.query.search){
		var search = '%' + req.query.search.replace(/\s/gi, "%") + '%';
	}
  else {
    var search = '%';
  }
	models.Quiz.findAll({
    where: ["lower(pregunta) like lower(?)", search],
    order: 'pregunta ASC'}).then(function(quizes) {
      res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch(function(error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( //Crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
  );

    res.render('quizes/new',{quiz: quiz, errors: []});
};

// GET /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
         // save: guarda en DB los campos pregunta y respuesta de quiz
        //  res.redirect: Redirección HTTP a lista de preguntas
        quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then(function(){res.redirect('/quizes')})
      }
    }
  );
};

// GET /quizes:id/edit
exports.edit = function(req, res) {
  var rquiz = req.quiz;   // autoload de instancia de quiz

    res.render('quizes/editr',{quiz: quiz,  errors: []});
};

// GET /quizes/update
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
         // save: guarda en DB los campos pregunta y respuesta de quiz
        //  res.redirect: Redirección HTTP a lista de preguntas
        req.quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then(function(){res.redirect('/quizes')})
      }
    }
  );
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then(function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
