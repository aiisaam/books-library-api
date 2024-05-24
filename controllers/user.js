const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async(req, res) => {

    try {
        const { userName, email, password } = req.body;
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400).send({ message:' Ce email est déja enregistrer '});
            return;
        }
        const  hashPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password", hashPassword);
        const user = await User.create({
            userName,  
            email,      
            password: hashPassword,
        });
        if (user) {
            const token = jwt.sign({ _id: user.id }, 'Act+9*.' , {expiresIn:'1h'});
            res.status(201).json({ _id: user.id, token: token, message:'Utilisateur enregistré'});
            return;
        } else  {
            res.status(500).send({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
            return;
        }        
    } catch (err) {
        res.status(404).send({ message: err.message });
    };
};


exports.login = async(req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        res.status(400).send({ message:'remplissez tous les champs' });
        return;
    }
    const user = await User.findOne({ email });
    //compare password with hashpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = await jwt.sign({ _id: user._id}, 'uNiQ0l4' , {expiresIn: '1h'});  
        res.status(201).send({ _id: user._id, token: token, message: 'Connection réussie' });
        return;
    } else {
        res.status(404).send({ message: 'Invalid email or password' });
        return;
    }
};
