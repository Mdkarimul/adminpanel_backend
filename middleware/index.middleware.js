function check_bearer_token (request,response,next){
       
    const bearerHerder = request.headers.authorization;
   if(typeof bearerHerder !== 'undefined'){
 
   const bearer = bearerHerder.split(' ');
   const bearerToken = bearer[1];
   request.token = bearerToken;
    next();
 }else{
   response.json({message:"User not authenticated !"});
   response.status(403);
 } 
 
 }

 module.exports = {
    check_bearer_token : check_bearer_token
 }