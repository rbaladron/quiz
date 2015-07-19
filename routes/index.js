var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada (home page)
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Quiz',
    errors: []
  });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId
router.paran('commentId', commentController.load);  // autoload :commentID

// Definición de rutas de sesión
router.get('/login', sessionController.new);        // Formulario login
router.post('/login', sessionController.create);    // Crear sesión
router.get('/logout', sessionController.destroy);   // Destruir sesión

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


// Créditos
router.get('/quizes/creditos/author', quizController.author);

module.exports = router;
