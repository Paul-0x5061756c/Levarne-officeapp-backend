const j = require("joi");

function validateHelper(schema : any, values: any)
{
    const { error, value } = schema.validate(values)
    if(error){
      throw error
    }else {
      return value
    }
}

export = validateHelper