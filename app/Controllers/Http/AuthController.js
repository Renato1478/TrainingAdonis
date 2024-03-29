'use strict'

const User = use('App/Models/User');
const Helpers = use('Helpers');

class AuthController {
    
    async signup({ response, view }) {
        return response.send(view.render('auth.signup'))
    }

    async store({ request, response, auth, session }) {
        const userData = request.except(['_csrf'])

        const profilePic = request.file('profile_pic', {
            types: ['image'],
            size: '2mb'
        })
        
        if(profilePic){
            userData.profile_pic = new Date().getTime()+'.'+profilePic.subtype

            await profilePic.move(Helpers.publicPath('img/users'), {
                name: userData.profile_pic,
                overwrite: true
            })
        
            if (!profilePic.moved()) {   
                session.flash({ error: 'Ocorreu um erro ao subir a imagem' })
                return profilePic.error()
            }
        }else{
            userData.profile_pic = 'user-profile-default.png'
        }

        const user = await User.create(userData);
        
        await auth.logout()
        await auth.login(user) // login the registered user 
        session.flash({ success: 'Você agora está cadastrado! Bem-vindo!' })
        return response.redirect('/')
    }

    async login({ response, view }) {
        return response.send(view.render('auth.login'))
    }

    async auth({ request, response, auth, session }) {
        const { email, password } = request.all()
        const user = await User.query().where('email','=',email).first();
        if(user) {
            await auth.logout()
            await auth.attempt(email, password)
            session.flash({ success: 'Bem-vindo!' })      
            return response.redirect('/')
        }
        session.flash({ error: 'Desculpe, mas não achamos este usuário!' })
        return response.redirect('back')
    }

    async logout({ auth, response }) {
        await auth.logout();
        return response.redirect('/login')
    } 

}

module.exports = AuthController
