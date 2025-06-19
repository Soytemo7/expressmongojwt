import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{         
    console.log(req.body);
    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});        
        if(user) throw{code:11000};

        user = new User({email,password});

        await user.save();
        return res.status(201).json({ok:true});
    } catch (error) {
        console.log(error.code);
        if(error.code===11000){
            return res.status(400).json({error:"Ya existe este usuario"});
        }
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const login = async (req,res)=>{    
    console.log(req.body);
    
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email})

        if(!user) return res.status(403).json({error:"No existe este usuario"});

        const respuestaPassword = await user.comparePassword(password);
        if(!respuestaPassword){
            return res.status(403).json({error:"Contraseña incorrecta"});
        }
        
        const token = jwt.sign({uid:user._id},process.env.JWT_SECRET);

        return res.json({ok:true, token});      
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Error de Servidor"});
    }
};
