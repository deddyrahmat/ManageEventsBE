// data book from model Book
const {Event} = require('../../../models');

// delete file
const fs = require('fs');

// memanggil fungsi validation form
const formValidation = require('../../middlewares/formValidation');

const catchError = (err, res) => {
    console.log(err);
    return res.status(500).send({
        status : "Request Failed",
        error : {
            message : "Server Error"
        }
    })
}

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findAll({
            attributes : {
                exclude : ["createdAt","updatedAt"]
            },
            order : [
                ["id", "DESC"]
            ]
        });

        if (!event) {
            return res.status(400).send({
                status : "Server Error",
                error : {
                    message : "Data Event Not Found"
                }
            })
        }

        res.send({
            statue:"Success",
            message:"Get Data Event Success",
            data : {event}
        });
    } catch (err) {
        catchError(err, res)
    }
}

exports.storeEvent = async (req, res) => {
    try {
        const {body, files} = req;

        console.log("body event",body);
        console.log("files event",files);
        const fileName = files.picture[0].filename

        const {error} =  formValidation.eventValidation(body);

        if (error) {
            return res.status(400).send({
                status : "validation error",
                error : {
                    message : error.details.map((error) => error.message)
                }
            })
        }

        const event = await Event.create({...body, picture: fileName });


            if (!event) {
                return res.status(400).send({
                    status : "Error",
                    error : {
                        message : "Upload failed"
                    }
                })
            }

            const response = await Event.findOne({
                where : {
                    id : event.id
                },
                attributes : {
                    exclude : ["createdAt","updatedAt"]
                }
            })

            return res.send({
                status : "Success",
                message : "Event Success Created",
                data : {
                    event : response
                }
            });

    } catch (err) {
        catchError(err, res)
    }
}