const Joi = require('joi');

const eventValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        location: Joi.string().min(1).required(),
        participant: Joi.string().required(),
        dateEvent: Joi.string().min(1).required(),
        note: Joi.string().min(1).required(),
    });

    return schema.validate(data, {
        // option untuk menmapilkan pesan error lebih dari 1
        abortEarly:false
    });
}

module.exports = {
    eventValidation
}