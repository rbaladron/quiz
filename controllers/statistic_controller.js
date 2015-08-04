var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res, next) {

  var statistics = {
    preguntas: 0,
    comentarios: 0,
    mediaComentariosPregunta: 0.0,
    preguntasSinComentarios: 0,
    preguntasConComentarios: 0
  };

  // Preguntas
  models.Quiz.count().then(function(numQuest) {
    statistics.preguntas = numQuest;
    // Comentarios, número y media
    models.Comment.count().then(function(numComm) {
      statistics.comentarios = numComm;
      statistics.mediaComentariosPregunta = statistics.preguntas ? (statistics.comentarios / statistics.preguntas).toFixed(2) : 0;
      // Preguntas con comentarios y sin comentarios
      models.Quiz.count({
          distinct: true,
          include: [{
            model: models.Comment
          }],
          where: ['"Comments"."QuizId" IS NOT NULL']
        })
        .then(function(pregConCom) {
          if (!isNaN(pregConCom)) {
            statistics.preguntasConComentarios = pregConCom;
            statistics.preguntasSinComentarios = statistics.preguntas - statistics.preguntasConComentarios;
          }
          //Visualiza la página de las estadísticas
          res.render('statistics/statistics', {
            statistics: statistics,
            errors: []
          });

        }).catch(function(error) {
          next(error)
        })
    }).catch(function(error) {
      next(error)
    })
  }).catch(function(error) {
    next(error)
  });

};
