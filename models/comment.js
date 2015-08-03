// Definición del modelo de Comment con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Comment', {
      texto: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: " Falta -> Comentario"
          }
        }
      },
      publicado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      classMethods: {

        // Cuenta el total de los quizes no comentados
        CountUnCommentedQuizes: function() {
          return this.aggregate('QuizId', 'count', {
            'distinct': false
          }).then('success', function(count) {
            return count;
          })
        },

        // Cuenta el total de los comentarios no publicados
        CountUnPublished: function() {
          return this.count('QuizId', {
            'where': {
              'publicado': false
            }
          }).then('success', function(count) {
            return count;
          })
        },

        // Cuenta el total de los quizes comentados
        CountCommentedQuizes: function() {
          return this.aggregate('QuizId', 'count', {
            'distinct': true
          }).then('success', function(count) {
            return count;
          })
        }
      }
    });
};
