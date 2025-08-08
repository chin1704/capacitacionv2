const { Provincia, ProvinciaSchema } = require('./provincia.model');
const { Canton, CantonSchema} = require('./canton.model');

const { Parroquia, ParroquiaSchema } = require('./parroquia.model');
const { TipoPersona, TipoPersonaSchema } = require('./tipo_persona.model');
const { Persona, PersonaSchema } = require('./persona.model');
const { Interaccion, InteraccionSchema } = require('./interaccion.model');


function setupComunidadModels(sequelize) {


   //models
   Provincia.init(ProvinciaSchema, Provincia.config(sequelize));
   Canton.init(CantonSchema, Canton.config(sequelize));
   Parroquia.init(ParroquiaSchema, Parroquia.config(sequelize)); 
   TipoPersona.init(TipoPersonaSchema, TipoPersona.config(sequelize));
   Persona.init(PersonaSchema, Persona.config(sequelize));
   Interaccion.init(InteraccionSchema, Interaccion.config(sequelize));

   //association
   Provincia.associate({ Canton });
   Canton.associate({ Provincia, Parroquia });
   Parroquia.associate({ Canton,Persona});
   TipoPersona.associate({ Persona});
   Persona.associate({ Parroquia, TipoPersona, Interaccion});
   Interaccion.associate({ Persona});

}

module.exports = setupComunidadModels;
