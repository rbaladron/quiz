var express = require('express');
var router = express.Router();

// Controladores
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');

// Página de entrada (home page)
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Quiz',
    errors: []
  });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId
router.param('commentId', commentController.load); //autoload :commentId

// Definición de rutas de sesión
router.get('/login', sessionController.new);        // Formulario login
router.post('/login', sessionController.create);    // Crear sesión
router.get('/logout', sessionController.destroy);   // Destruir sesión
router.get('/autoLogout', sessionController.autoLogout); // Autodesconexión


// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);


// Definición de rutas de Créditos
router.get('/quizes/creditos/author', quizController.author);

// Definición de rutas de /statistics
router.get('/quizes/statistics', statisticController.calculate, statisticController.show );

module.exports = router;
