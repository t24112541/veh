if(process.env.NODE_ENV === 'production'){
  module.exports = {
    api_url:process.env.API_URL
  }
}