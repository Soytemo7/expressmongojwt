import { Link } from "../models/Link.js";

export const redirectLinkController = async(req,res) => {
    try {
          const {nanoLink} = req.params;
          const link = await Link.findOne({nanoLink})
          console.log(link);
          
          if(!link) return res.status(404).json({error:"No existe el link"});      
                  
          return res.redirect(link.longLink);
      } catch (error) {
          console.log(error);
          if(error.kind === "ObjectID"){
              return res.status(403).json({error:"Formato id incorrecto"});
          }
          return res.status(500).json({error:"Error de servidor"});
      }
}