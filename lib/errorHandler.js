function  errorHandler(err, req, res, next) {
  console.log(err)
  // receives any erros from the previous middleware
  if (err.name === 'ValidationError') {
    //tidy up mongoose error
    for (const key in err.errors) {
      // assign the error message to the key in the error object, instead of sending back the whole error objects
      err.errors[key] = err.errors[key].message
    }
    //send just the validation errors
    return res.status(422).json({errors: err.errors})
  }
  res.sendStatus(500) //send a response
  next(err) //sends an error to the terminal
}


module.exports = errorHandler
