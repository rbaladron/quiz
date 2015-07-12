var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada (home page)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comando con :quizId
router.param('quizId', quizController.load);  //autoload :quizId

// Definición de rutas de /quizes
rotuer.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* GET página author */
router.get('/author', function(req, res) {
  res.render('author');
})

module.exports = router;
