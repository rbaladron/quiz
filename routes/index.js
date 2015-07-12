var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Definición de rutas de /quizes
rotuer.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', quizController.answer);

/* GET página author */
router.get('/author', function(req, res) {
  res.render('author');
})

module.exports = router;
